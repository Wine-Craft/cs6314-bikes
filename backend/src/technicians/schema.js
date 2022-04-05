import mongoose from 'mongoose';

import { SkillSchema } from '../skills/schema.js';

export const TechnicianSchema = new mongoose.Schema({
    aboutMe: String,
    skills: [ SkillSchema ],

    // copied from User
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        unique: true,
    },
    email: String,
    name: {
        given: String,
        family: String,
    },
    imageURL: String,
}, {
    timestamps: true,
});

TechnicianSchema.methods.updateFromUser = function(user) {
    this.email = user.email;
    this.name.given = user.name.given;
    this.name.family = user.name.family;
    this.imageURL = user.imageURL;
}

TechnicianSchema.statics.updateTechnicianUser = async function(user) {
    let technician = await this.findOne({
       userID: user._id,
    });

    if(!technician) {
        return false;
    }
    technician.updateFromUser(user);
    await technician.save();
    return true;
}

let model = null;

export function initModel(connection) {
    model = connection.model("Technician", TechnicianSchema);
}

export function getTechnicianModel() {
    return model;
}