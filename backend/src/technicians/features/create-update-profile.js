import { check } from "express-validator";

import { getTechnicianModel } from "../schema.js";
import isObjectID from "../../validator/object-id.js";
import { getSkillModel } from "../../skills/schema.js";

export async function createUpdateProfile(req, res) {
    const Technician = getTechnicianModel();
    const Skill = getSkillModel()

    try {
        const {
            about_me,
            skills,
            services,
            location,
            range,
        } = req.body;
        const user = req.user;

        let technician = await Technician.findOne({
           userID: user._id,
        });

        if(!technician) {
            technician = await Technician.create({
                userID: user._id,
            });
            technician.updateFromUser(user);
        }
        technician.aboutMe = about_me;
        technician.services = services;
        technician.skills = await Skill.find({
            _id: {
                $in: skills,
            },
        });
        technician.location = location;
        technician.range = range;

        user.nowTechnician();

        await technician.save();

        if(user.isModified()) {
            await user.save();
        }

        return res.status(200).json({
            technician,
            user,
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({});
    }
}
export const createUpdateProfileRules = [
    check('about_me').isLength({
       min: 10,
    }),
    check('skills').isArray(),
    check('skills.*').isString().custom(isObjectID),
    check('services').isArray(),
    check('services.*.tentativePrice').isNumeric(),
    check('services.*.title').isLength({
        min: 1,
    }),
    check('services.*.description').isLength({
        min: 1,
    }),
    check('location').isObject(),
    check('location.latitude').isNumeric({
        min: -90,
        max: 90,
    }),
    check('location.longitude').isFloat({
        min: -180,
        max: 180,
    }),
    check('range').isFloat({
        min: 0,
        max: 50000,
    }),
];