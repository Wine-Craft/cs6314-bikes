import { getSkillModel } from '../schema.js';

export default async function skillAlreadyExists(name) {
    console.log(name);
    const Skills = getSkillModel();
    const skill = await Skills.findOne({
       name: name,
    });

    if(skill) {
        throw new Error('Skill already exists!');
    }
    return true;
}