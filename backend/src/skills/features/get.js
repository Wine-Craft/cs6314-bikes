import { getModel } from '../schema.js';

export default async function getSkills(req, res) {
    const Skills = getModel();

    try {
        const skills = await Skills.find({});
        console.log(skills);
        return res.status(200).json({
           skills,
        });
    } catch(err) {
        return res.status(500).send();
    }
}