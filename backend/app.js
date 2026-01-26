const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser")
const cors = require("cors")

const AuthRoutes = require("./routes/auth.routes.js");
const JobRoute = require("../backend/routes/job.route.js")
const CompanyRoute = require("../backend/routes/company.routes.js")
const ApplicationRoute = require("../backend/routes/application.route.js");

app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}

app.use(cors(corsOptions))



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
app.use("/api/company" , CompanyRoute);
app.use("/api" , ApplicationRoute)


app.listen(8080 , () => {
    console.log("Server is listning to the port 8080.")
})

