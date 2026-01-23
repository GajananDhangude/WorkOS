const express = require("express")

const {CreateJob , GetAllJobs} = require("../controllers/job.controller.js")
const router = express.Router();



router.post("/post" , CreateJob)
router.get("/get" , GetAllJobs)



module.exports = router;