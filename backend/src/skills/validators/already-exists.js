import { getModel } from '../schema.js';

export default async function skillAlreadyExists(name) {
    console.log(name);
    const Skills = getModel();
    const skill = await Skills.findOne({
       name: name,
    });

    if(skill) {
        throw new Error('Skill already exists!');
    }
    return true;
}