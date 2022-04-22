import mongoose from "mongoose";
import {UserSchema} from "../users/schema.js";
import {TechnicianSchema} from "../technicians/schema.js";
import {SkillSchema} from "../skills/schema.js";

export const JobSchema = new mongoose.Schema({
    requestor: UserSchema,
    technician: TechnicianSchema,
    title: String,
    description: String,
    tags: [ SkillSchema ],

    // decided together
    time: Date,
    price: Number,
    paid: Boolean,
    canceled: Boolean,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
JobSchema.index({ "requestor._id": 1, });
JobSchema.index({ "technician.userID": 1, });

JobSchema.virtual('isFinalized').get(function() {
    if(this.time && this.price && this.paid) {
        return true;
    }
    return false;
});

let model = null;

export function initModel(connection) {
    model = connection.model("Job", JobSchema);
}

export function getJobModel() {
    return model;
}