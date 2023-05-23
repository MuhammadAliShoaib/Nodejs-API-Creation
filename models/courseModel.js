const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Duration:{
        type:Number,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    ShortName:{
        type:String,
        required:true
    }
})


const courseModel = mongoose.model("Course",CourseSchema)

module.exports = courseModel;