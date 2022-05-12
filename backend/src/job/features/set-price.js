import {getJobModel} from "../schema.js";
import isObjectID from "../../validator/object-id.js";
import {check} from "express-validator";

export async function setJobPrice(req, res) {
    const Job = getJobModel();

    try {
        const {
            id, price
        } = req.body;

        let user = req.user;
        const job = await Job.findOne({
            _id: id,
             "technician.userID": user._id,
        });

        if(!job) {
            return res.status(404).json({});
        }
        job.price = price;
        await job.save();
        return res.status(200).json({
            job: job,
        });
    } catch(e) {
        return res.status(500).json({});
    }
}

export const setJobPriceRules = [
    check('id').isString().custom(isObjectID),
    check('price').isNumeric(),
]