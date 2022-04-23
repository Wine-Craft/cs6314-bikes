import cors from 'cors';
import http from 'http';
import { Server }  from "socket.io";
import morgan from 'morgan';
import express from 'express';
import bodyParser from "body-parser";

import { authRouter } from '../auth/routes.js';
import { skillsRouter } from "../skills/routes.js";
import { techniciansRouter } from "../technicians/routes.js";
import {jobsRouter} from "../job/routes.js";
import setupJobDiscussionServer from "../job-discussion/server.js";

export default async function initServer() {
    const app = express();

    // use middlewares
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    // use routes
    app.use('/auth', authRouter);
    app.use('/jobs', jobsRouter);
    app.use('/skills', skillsRouter);
    app.use('/technicians', techniciansRouter);

    // publish to HTTP server
    const port = process.env.PORT;
    const server = http.createServer(app);
    server.listen(port);

    setupJobDiscussionServer(new Server(server));

    console.log(`Server running on http://localhost:${ port }`);
}