import express from "express";
import {isLoggedIn} from "../authorizer/authorizer.js";
import {createJob, createJobRules} from "./features/create.js";
import validate from "../validator/validate.js";
import getRequestorJobs from "./features/get-requestor.js";
import getTechnicianJobs from "./features/get-technician.js";
import {deleteJob} from "./features/delete.js";
import {setJobPrice, setJobPriceRules} from "./features/set-price.js";
import {acceptJob, acceptJobRules} from "./features/accept.js";
import {finishJob, finishJobRules} from "./features/finish.js";

const router = express.Router();
router.delete('/', isLoggedIn, deleteJob);
router.post('/', isLoggedIn, createJobRules, validate, createJob);
router.post('/set-price', isLoggedIn, setJobPriceRules, validate, setJobPrice);
router.post('/accept', isLoggedIn, acceptJobRules, validate, acceptJob);
router.post('/finish', isLoggedIn, finishJobRules, validate, finishJob);
router.get('/requestor', isLoggedIn, getRequestorJobs);
router.get('/technician', isLoggedIn, getTechnicianJobs);

export const jobsRouter = router;