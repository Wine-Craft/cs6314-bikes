import 'dotenv/config';

import initServer from "./app/server.js";
import initConnection from "./db/connection.js";

import * as UserSchema from './users/schema.js';

(async function() {
    let connection = await initConnection();
    UserSchema.initModel(connection);

    await initServer();
})();