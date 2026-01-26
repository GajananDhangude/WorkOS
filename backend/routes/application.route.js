const express = require("express");
const ApplicationController = require("../controllers/application.controller.js");
const {authUserMiddleware} = require("../middleware/auth.middleware.js")
const router = express.Router();


router.post("/apply/:_id" ,authUserMiddleware, ApplicationController.ApplyJob)
router.get("/appliedjobs" ,authUserMiddleware ,  ApplicationController.getAppliedJobs)
router.get("/:_id/applicants" , authUserMiddleware , ApplicationController.getApplicants)
router.get("/application/:id", authUserMiddleware, ApplicationController.getApplicationById) 
router.patch("/application/:id/status" , authUserMiddleware , ApplicationController.updateApplicationStatus)



module.exports = router;