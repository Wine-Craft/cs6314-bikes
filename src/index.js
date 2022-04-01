import mongoose from 'mongoose';
import 'dotenv/config';

import * as UserSchema from './users/schema.js';

(async function() {
    const mongo_host = process.env.MONGO_HOST;
    const mongo_user = process.env.MONGO_USER;
    const mongo_pass = process.env.MONGO_PASS;
    const mongo_db = process.env.MONGO_DB;

    let connection = await mongoose.connect(`mongodb://${mongo_user}:${mongo_pass}@${mongo_host}:27017/${mongo_db}`);
    UserSchema.initModel(connection);

    const User = UserSchema.getModel();

    const oldUser = await User.findOne({
       email: "jnormantransactions@gmail.com",
    }).exec();
    console.log(oldUser);
    console.log(await oldUser.checkPassword('r'));

})();