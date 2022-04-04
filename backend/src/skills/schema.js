import mongoose from 'mongoose';

const Skill = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
    },
    icon: String,
});

export const Schema = Skill;

let model = null;

export function initModel(connection) {
    model = connection.model("Skill", Skill);
}

export function getModel() {
    return model;
}