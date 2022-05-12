import {getJobModel} from "../schema.js";
import isObjectID from "../../validator/object-id.js";
import {check} from "express-validator";

export async function acceptJob(req, res) {
    const Job = getJobModel();

    try {
        const {
            id, accepted
        } = req.body;

        let user = req.user;
        const job = await Job.findOne({
            _id: id,
            "requestor._id": user._id
        });

        if(!job) {
            return res.status(404).json({});
        }
        if(accepted) {
            job.accepted = true;
            job.canceled = false;
        } else {
            job.accepted = false;
            job.canceled = true;
        }
        await job.save();
        return res.status(200).json({
            job,
        });
    } catch(e) {
        return res.status(500).json({});
    }
}

export const acceptJobRules = [
    check('id').isString().custom(isObjectID),
    check('accepted').isBoolean(),
];