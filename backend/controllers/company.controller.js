const CompanyModel = require("../models/CompanySchema.js")


async function registerCompany (req , res) {
    try{

        const {name , description} = req.body;

        const userId = req.user._id
        
        if (!userId) {
            return res.status(401).json({
                message: "User authentication failed. Please login again.",
                success: false
            });
        }

        if(!name){
            return res.status(400).json({
                message:"Comapny Name is required.",

            });

        };

        const isCompanyExists = await CompanyModel.findOne({name});

        if(isCompanyExists){
            return res.status(400).json({
                message:"Comapny Name Already Exists."
            })
        }

        const newComapny = await CompanyModel.create({
            name:name,
            description:description,
            userId:userId
        })

        return res.status(201).json({
            message:"Comapny registered successfully.",
            newComapny
        })

        

    } catch(error) {
        console.log(error)
    }
}


async function getCompany(req , res) {

    const userId = req.user._id
    const companies = await CompanyModel.find({userId});

    if(!companies){
        return res.status(400).json({message:"Company Not found" , success: false})

    }

    return res.status(201).json({message:"companies are found" , companies , success:true})
}


async function getCompanyById (req , res){
    try{
        const companyId = req.params._id;
        const company = await CompanyModel.findById(companyId);
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            company,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}




module.exports = {
    registerCompany,
    getCompany,
    getCompanyById
}