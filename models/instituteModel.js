const mongoose = require("mongoose")

const InstituteSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    ShortName:{
        type:String,
    },
    Telephone:{
        type:Number,
        required:true
    }
})


const instituteModel = mongoose.model("Institute",InstituteSchema)

module.exports = instituteModel;