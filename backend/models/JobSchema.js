const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  jobType:{
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default : "Full-time"
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
    
  },
  applications:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Application'
  }]

});

const JobModel = mongoose.model("Job" , JobSchema);

module.exports = JobModel;