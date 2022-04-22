import {check} from "express-validator";
import isObjectID from "../../validator/object-id.js";
import {getJobModel} from "../schema.js";
import {getTechnicianModel} from "../../technicians/schema.js";
import {getSkillModel} from "../../skills/schema.js";

export async function createJob(req, res) {
    const Job = getJobModel();
    const Skill = getSkillModel();
    const Technician = getTechnicianModel();

    try {
        const {
            technician_id,
            tags,
            title,
            description,
        } = req.body;

        let user = req.user;
        let technician = await Technician.findOne({
            userID: technician_id,
        });

        if(!technician) {
            return res.status(404).json({});
        }
        const job = await Job.create({
            title: title,
            description: description,
            technician: technician,
            requestor: user,
        });
        job.tags = await Skill.find({
            _id: {
                $in: tags,
            },
        });

        await job.save();

        return res.status(200).json({
            job: job,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({});
    }
}

export const createJobRules = [
    check('technician_id').isString().custom(isObjectID),
    check('tags').isArray(),
    check('tags.*').isString().custom(isObjectID),
    check('title').isString().isLength({
        min: 1,
    }),
    check('description').isString().isLength({
        min: 1,
    }),
];

