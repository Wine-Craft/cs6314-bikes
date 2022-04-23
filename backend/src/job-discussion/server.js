import {getUserModel} from "../users/schema.js";
import {getJobModel} from "../job/schema.js";
import authenticateJobDiscussion from "./authenticate.js";
import { createOrFindRoomState, deleteRoomState } from "./state.js";

export default function setupJobDiscussionServer(io) {
    const User = getUserModel();
    const Job = getJobModel();

    io.on('connection', async (socket) => {
        const response = await authenticateJobDiscussion(socket);
        if(!response) {
            console.log("?!?!");
            return socket.disconnect();
        }

        const { user, job } = response;
        const room_id = job._id.toString();
        socket.join(room_id);
        const roomState = createOrFindRoomState(room_id, job);
        roomState.connect(user);

        io.to(room_id).emit('connected_users',
            Array.from(roomState.connected)
        );
        if(roomState.isProposed()) {
            socket.emit('proposed_price', {
                user: roomState.priceProposer._id,
                price: roomState.proposedPrice,
            });
        }
        socket.emit('accepted_price', roomState.acceptedPrice);

        socket.on("propose_price", (price) => {
            if(!roomState.isAccepted()
                && !roomState.isProposed()
            ) {
                roomState.propose(price, user);
                io.to(room_id).emit('proposed_price', {
                    user: user._id,
                    price: price,
                });
            }
            console.log(roomState);
        });
        socket.on("decline_price", () => {
            if(!roomState.isAccepted()
                && roomState.isProposed()
            ) {
                roomState.declinePrice();
                io.to(room_id).emit('declined_price', true);
            }
            console.log(roomState);
        });
        socket.on("accept_price", async () => {
            if(!roomState.isAccepted()
                && roomState.isProposed()
                && !roomState.isProposer(user)
            ) {
                try {
                    await roomState.acceptPrice();
                } catch(e) {
                    console.log(e);
                }
                io.to(room_id).emit('accepted_price', roomState.acceptedPrice);
            }
            console.log(roomState);
        });

        socket.on("message", async (text) => {
            io.to(room_id).emit('message', {
                user: user._id,
                text: text,
            });
            try {
                await roomState.sendMessage(user, text);
            } catch(e) {
                console.log(e);
            }
        });

        socket.on('disconnect', async () => {
            roomState.disconnect(user);
            if(roomState.isEmpty()) {
                deleteRoomState(room_id);
            }
        });
    });
}