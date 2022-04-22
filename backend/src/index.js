import 'dotenv/config';

import initServer from "./app/server.js";
import initConnection from "./db/connection.js";

import * as JobSchema from "./job/schema.js";
import * as UserSchema from './users/schema.js';
import * as SkillSchema from './skills/schema.js';
import * as TechnicianSchema from "./technicians/schema.js";

(async function() {
    let connection = await initConnection();
    JobSchema.initModel(connection);
    UserSchema.initModel(connection);
    SkillSchema.initModel(connection);
    TechnicianSchema.initModel(connection);

    await initServer();
})();