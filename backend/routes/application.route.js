const express = require("express");
const ApplicationController = require("../controllers/application.controller.js");
const {authUserMiddleware} = require("../middleware/auth.middleware.js")
const router = express.Router();


router.get("/apply/:_id" ,authUserMiddleware, ApplicationController.ApplyJob)
router.get("/appliedjobs" ,authUserMiddleware ,  ApplicationController.getAppliedJobs)



module.exports = router;