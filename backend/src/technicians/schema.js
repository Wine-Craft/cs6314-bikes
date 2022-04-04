import mongoose from 'mongoose';

import { Schema as Skill } from '../skills/schema.js';

const Technician = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    aboutMe: String,
    skills: [ Skill ],
});