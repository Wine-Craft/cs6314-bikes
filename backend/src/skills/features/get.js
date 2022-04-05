import { getSkillModel } from '../schema.js';

export default async function getSkills(req, res) {
    const Skills = getSkillModel();

    try {
        const skills = await Skills.find({});
        return res.status(200).json({
           skills,
        });
    } catch(err) {
        return res.status(500).send();
    }
}