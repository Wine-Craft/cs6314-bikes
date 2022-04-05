import express from "express";

import { createUpdateProfileRules, createUpdateProfile } from "./features/create-update-profile.js";
import {isLoggedIn} from "../authorizer/authorizer.js";
import validate from "../validator/validate.js";

const router = express.Router();
router.post('/profile', isLoggedIn, createUpdateProfileRules, validate, createUpdateProfile);

export const techniciansRouter = router;