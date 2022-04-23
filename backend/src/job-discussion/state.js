export const roomState = new Map();

export function createOrFindRoomState(id, job) {
    if(roomState.has(id)) {
        return roomState.get(id);
    }
    const newRoom = RoomState(id, job);
    roomState.set(id, newRoom);
    return newRoom;
}

export function deleteRoomState(id) {
    roomState.delete(id);
}

function RoomState(id, job) {
    const state = {
        id: id,
        job: job,

        priceProposer: null,
        proposedPrice: null,
        acceptedPrice: null,

        connected: new Set(),

        messages: [],
    };

    if(job.price) {
        state.acceptedPrice = job.price;
    }
    if(job.messages) {
        state.messages = job.messages;
    }

    state.isProposed = function() {
        return this.priceProposer && this.proposedPrice;
    }

    state.isProposer = function(acceptor) {
        return acceptor._id === this.priceProposer._id;
    }

    state.isAccepted = function() {
        return this.acceptedPrice != null;
    }

    state.propose = function(price, proposer) {
        this.proposedPrice = price;
        this.priceProposer = proposer;
    }

    state.acceptPrice = async function() {
        this.acceptedPrice = this.proposedPrice;
        job.price = this.acceptedPrice;
        await job.save();
    }

    state.cancelPrice = async function() {
        this.acceptedPrice = null;
        this.priceProposer = null;
        this.proposedPrice = null;

        job.price = null;
        await job.save();
    }

    state.declinePrice = function() {
        this.priceProposer = null;
        this.proposedPrice = null;
    }

    state.sendMessage = async function(user, text) {
        const message = {
            user: user._id,
            text: text,
        };
        this.messages.push(message);
    }

    state.isEmpty = function() {
        return state.connected.size == 0;
    }

    state.isConnected = function(user) {
        return state.connected.has(user._id);
    }

    state.connect = function(user) {
        state.connected.add(user._id);
    }

    state.disconnect = function(user) {
        state.connected.delete(user._id);
    }

    return state;
}