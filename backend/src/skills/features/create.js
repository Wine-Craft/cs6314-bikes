import { check } from "express-validator";

import { getSkillModel } from "../schema.js";
import hexCode from "../validators/hex-code.js";
import skillAlreadyExists from "../validators/already-exists.js";

export const createSkillRules = [
    check('name').isLength({
        min: 1,
        max: 25,
    }).custom(skillAlreadyExists),
    check('icon').isLength({
        min: 1,
        max: 25,
    }),
    check('color').isString().custom(hexCode),
];
export async function createSkill(req, res) {
    const Skills = getSkillModel();

    try {
        const { name, icon, color } = req.body;
        const skill = new Skills({
            name: name,
            icon: icon,
            color: color,
        });
        await skill.save();

        return res.status(200).json({
            skill,
        });
    } catch(err) {
        return res.status(500).send();
    }
}