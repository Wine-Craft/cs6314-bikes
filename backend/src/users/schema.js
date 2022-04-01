import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const User = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    googleID: String,
});

User.methods.setPassword = async function(plain) {
    const hashed = await bcrypt.hash(plain, 10);
    this.password = hashed;
}

User.methods.checkPassword = async function(plain) {
    const match = await bcrypt.compare(plain, this.password);
    return match;
}

let model = null;

export function initModel(connection) {
    model = connection.model("User", User);
}

export function getModel() {
    return model;
}