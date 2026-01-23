const JobModel = require("../models/JobSchema.js");

async function CreateJob(req , res) {
    try{
        const {title , description , company , location , salary , jobType } = req.body;
        const userId = req.user._id;

        const job = await JobModel.create({
            title:title,
            description:description,
            company:company,
            location:location,
            salary:salary,
            jobType:jobType,
            createdBy:userId
        })

        return res.status(201).json({
            message:"Job created Succcessfully.",
            job

        })

    } catch (error){
        console.log(error)
    }
    

}


async function GetAllJobs(req , res) {

    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await JobModel.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
            message: "Jobs not found.",
            success: false
            })
        };

        return res.status(200).json({
            message:"Jobs find successful",
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}


async function getJobById (req , res) {
    try{
        const JobId = req.params._id;
        const job = await JobModel.findById(JobId).populate({
            path: "applications"
        });

        if(!job) {
            return res.status(400).json({
                message:"Jobs are not found",
            })

        }

        return res.status(201).json({
            message:"Jobs found successfully",
            job
        })
    } catch (error) {
        console.log(error)
    }
}


async function getAdminJobs (req , res) {
    try{

        const adminId = req.id

        const jobs = await JobModel.find({createdBy:adminId}).populate({
            path:'company',

        });

        if(!jobs){
            res.status(400).json({
                message:"Jobs Not Found"
            })

        }
        res.status(201).json({
            message:"Jobs find Successfully.",
            jobs,

        })
    } catch(error){
        console.log(error)
    }
}



module.exports = {
    CreateJob,
    GetAllJobs,
    getAdminJobs,
    getJobById
}
