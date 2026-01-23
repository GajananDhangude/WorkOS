const express = require("express")

const {CreateJob , GetAllJobs , getJobById} = require("../controllers/job.controller.js");
const { authUserMiddleware } = require("../middleware/auth.middleware.js");
const router = express.Router();



router.post("/post" , authUserMiddleware , CreateJob)
router.get("/get" , GetAllJobs);
router.get("/get/:_id" ,authUserMiddleware , getJobById )



module.exports = router;