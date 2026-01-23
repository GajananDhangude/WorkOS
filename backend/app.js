const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const AuthRoutes = require("./routes/auth.routes.js");
const JobRoute = require("../backend/routes/job.route.js")
const CompanyRoute = require("../backend/routes/company.routes.js")
const cookieParser = require("cookie-parser")

app = express();
app.use(express.json());
app.use(cookieParser());



main().then(() =>{
    console.log("Connnected to the database")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

}



app.get("/" , (rea , res)=> {
    res.send("This is a Home Page");
});

app.use("/api/auth" , AuthRoutes);
app.use("/api/jobs" , JobRoute);
app.use("/api/company" , CompanyRoute)


app.listen(8080 , () => {
    console.log("Server is listning to the port 8080.")
})

