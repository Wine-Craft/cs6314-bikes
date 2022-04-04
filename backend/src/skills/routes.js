import express from 'express';

import getSkills from './features/get.js';
import { createSkill, createSkillRules } from "./features/create.js";
import validate from "../validator/validate.js";
import {isAdmin, isLoggedIn} from "../authorizer/authorizer.js";

const router = express.Router();
router.get('/', getSkills);
router.post('/',
    isLoggedIn,
    isAdmin,
    createSkillRules, validate,
    createSkill
);

export const skillsRouter = router;