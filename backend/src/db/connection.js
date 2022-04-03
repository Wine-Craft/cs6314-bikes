import mongoose from "mongoose";

export default async function initConnection() {
    const mongo_host = process.env.MONGO_HOST;
    const mongo_user = process.env.MONGO_USER;
    const mongo_pass = process.env.MONGO_PASS;
    const mongo_db = process.env.MONGO_DB;

    let connection = await mongoose.connect(`mongodb://${mongo_user}:${mongo_pass}@${mongo_host}:27017/${mongo_db}`);
    return connection;
}