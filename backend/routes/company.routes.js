
const express = require("express")
const companyController = require("../controllers/company.controller.js")
const {authUserMiddleware} = require("../middleware/auth.middleware.js")

const router = express.Router();


router.post("/new" ,authUserMiddleware , companyController.registerCompany);
router.get("/get" ,authUserMiddleware, companyController.getCompany );
router.get("/get/:_id" ,authUserMiddleware, companyController.getCompanyById)



module.exports = router;