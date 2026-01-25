const ApplicationModel = require("../models/ApplicationSchema.js")
const JobModel = require("../models/JobSchema.js");


async function ApplyJob (req , res) {
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

    jobs.applications.push(newApplication._id);
    await jobs.save();

    return res.status(201).json({
        message:"Job applied successfully.",
        newApplication
    })

    

}


async function getAppliedJobs(req , res){

    try{

        const userId = req.user_id;
        const application = await ApplicationModel.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });

        if(!application){
            return res.status(404).json({
                message:"No application Found",
                success:false,
            })
        };

        return res.status(201).json({
            message:"Application Found",
            application,
            success:true,
        })




    } catch(error) {
        console.log(error)
    }

}


async function getApplicants (req , res){
    try{

        const jobId = req.params._id;
        const job = await JobModel.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })

        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });

    } catch {
        console.log(error)

    }
}

module.exports = {
    ApplyJob,
    getAppliedJobs
}