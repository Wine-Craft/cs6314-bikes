import {getJobModel} from "../schema.js";

export async function deleteJob(req, res) {
    const Job = getJobModel();

    try {
        const user = req.user;
        const id = req.query.id;
        if(!id) {
            return res.status(422).json({});
        }

        const job = await Job.findOne({
            $and: [{
                $or: [{
                    'technician.userID': user._id,
                }, {
                    'requestor._id': user._id,
                }],
            }, {
                _id: id,
            }],
        });

        if(!job) {
            return res.status(404).json({});
        }
        job.canceled = true;
        await job.save();

        return res.status(200).json({
            job: job,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({});
    }
}