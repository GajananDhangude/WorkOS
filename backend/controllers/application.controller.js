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

        const userId = req.user._id;
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

        return res.status(200).json({
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
            success:true
        });

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message:"Server error",
            success:false
        })
    }
}

async function updateApplicationStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['pending', 'accepted', 'rejected'].includes(status.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid status. Must be 'pending', 'accepted', or 'rejected'",
                success: false
            });
        }

        const application = await ApplicationModel.findByIdAndUpdate(
            id,
            { status: status.toLowerCase() },
            { new: true }
        ).populate('applicant').populate({
            path: 'job',
            populate: { path: 'company' }
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        return res.status(200).json({
            message: `Application ${status.toLowerCase()} successfully`,
            application,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

async function getApplicationById(req, res) {
    try {
        const { id } = req.params;

        const application = await ApplicationModel.findById(id)
            .populate('applicant')
            .populate({
                path: 'job',
                populate: { path: 'company' }
            });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

// Update module.exports
module.exports = {
    ApplyJob,
    getAppliedJobs,
    getApplicants,
    updateApplicationStatus,
    getApplicationById  // ADD THIS
}
