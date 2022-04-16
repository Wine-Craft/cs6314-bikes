import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: {
        given: String,
        family: String,
    },
    uploadedImgURL: String,

    googleID: String,
    googleProfileImgURL: String,

    isAdmin: Boolean,
    isTechnician: Boolean,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

UserSchema.methods.nowTechnician = function() {
    this.isTechnician = true;
}

UserSchema.methods.noLongerTechnician = function() {
    this.isTechnician = false;
}

UserSchema.methods.setPassword = async function(plain) {
    const hashed = await bcrypt.hash(plain, 10);
    this.password = hashed;
}

UserSchema.methods.checkPassword = async function(plain) {
    const match = await bcrypt.compare(plain, this.password);
    return match;
}

UserSchema.methods.getSafeObject = function() {
    const user = this;
    user.password = undefined;
    return user;
}

UserSchema.virtual('imageURL').get(function() {
    if(this.uploadedImageURL != null && this.uploadedImageURL != '') {
        return this.uploadedImageURL;
    }
    if(this.googleProfileImgURL != null && this.googleProfileImgURL != '') {
        return this.googleProfileImgURL;
    }
    return '';
});

UserSchema.virtual('isGoogleUser').get(function() {
    return this.googleID != null;
});

let model = null;

export function initModel(connection) {
    model = connection.model("User", UserSchema);
}

export function getUserModel() {
    return model;
}