import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from "body-parser";


import { authRouter } from '../auth/routes.js';
import { skillsRouter } from "../skills/routes.js";

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
    app.use('/skills', skillsRouter);

    // publish to HTTP server
    const port = process.env.PORT;
    await app.listen(port);
    console.log(`Server running on http://localhost:${ port }`);
}