import express from "express";

import { createUpdateProfileRules, createUpdateProfile } from "./features/create-update-profile.js";
import {isLoggedIn} from "../authorizer/authorizer.js";
import validate from "../validator/validate.js";
import {getTechnician} from "./features/get.js";
import browseTechnicians from "./features/browse.js";

const router = express.Router();
router.get('/', isLoggedIn, browseTechnicians);
router.get('/profile', isLoggedIn, getTechnician);
router.post('/profile', isLoggedIn, createUpdateProfileRules, validate, createUpdateProfile);

export const techniciansRouter = router;