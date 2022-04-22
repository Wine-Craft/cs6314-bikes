import {getJobModel} from "../schema.js";

export default async function getRequestorJobs(req, res) {
    const Job = getJobModel();

    try {
        const user = req.user;
        const jobs = await Job.find({
            "requestor._id": user._id,
        });

        return res.status(200).json({
            jobs,
        });
    } catch(e) {
        return res.status(500).json({});
    }
}