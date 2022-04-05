import { check } from "express-validator";

import { getTechnicianModel } from "../schema.js";

export async function createUpdateProfile(req, res) {
    const Technician = getTechnicianModel();

    try {
        const { about_me } = req.body;
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
        technician.skills = [];
        user.nowTechnician();

        await technician.save();
        await user.save();
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
];