import jwt from "jsonwebtoken";
import {getUserModel} from "../users/schema.js";
import {getJobModel} from "../job/schema.js";

export default async function authenticateJobDiscussion(socket) {
    const User = getUserModel();
    const Job = getJobModel();

    try {
        const { jwt_token, job_id } = socket.handshake.query;
        const { id } = jwt.verify(jwt_token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: id,
        });

        if(!user) {
            return null;
        }

        const job = await Job.findOne({
            $and: [{
                $or: [{
                    'technician.userID': user._id,
                }, {
                    'requestor._id': user._id,
                }],
            }, {
                _id: job_id,
            }],
        });

        if(!job) {
            return null;
        }

        return {
            user,
            job,
        };
    } catch(e) {
        return null;
    }
}