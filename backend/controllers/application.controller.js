const ApplicationModel = require("../models/ApplicationSchema.js")
const JobModel = require("../models/JobSchema.js");


async function ApplyJob(req , res) {
    const userId = req.user._id;
    const jobId = req.params._id;

    if(!jobId){
        return res.status(400).json({
            message:"Job Id is required",
            success:false
        })
    };

    const existingApplication = await ApplicationModel.findOne({job:jobId , applicant:userId});

    if(existingApplication){
        return res.status(201).json({messsage:"You have already applied for this job"})

    }

    const jobs = await JobModel.findById(jobId)

    if(!jobs){
        return res.status(400).json({
            message:"Job not found"
        })
    }

    const newApplication = await ApplicationModel.create({
        job:jobId,
        applicant:userId
    })

            return res.status(201).json({
            message:"Job applied successfully.",
            newApplication
        })

}