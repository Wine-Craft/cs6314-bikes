import mongoose from 'mongoose';

export const SkillSchema = new mongoose.Schema({
    name: String,
    icon: String,
    color: String,
});

let model = null;

export function initModel(connection) {
    model = connection.model("Skill", SkillSchema);
}

export function getSkillModel() {
    return model;
}