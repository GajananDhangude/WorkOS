const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const router = require("./routes/auth.routes.js");

app = express();
app.use(express.json());



main().then(() =>{
    console.log("Connnected to the database")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

}



app.get("/" , (rea , res)=> {
    res.send("This is a Home Page");
});

app.use("/api/auth" , router);



app.listen(8080 , () => {
    console.log("Server is listning to the port 8080.")
})

