const express = require("express");
const CourseModel = require("../models/courseModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get('/', async (req, res) => {
    const result = await CourseModel.find()
    try {
        if (!result) {
            res.send(sendResponse(false, null, "Data not found")).status(400)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (e) {
        res.send(sendResponse(false)).status(400)
    }
});

route.get("/:id", (req, res) => {
    res.send("Get Single institute data")
})


route.post("/", async(req, res) => {
    let { Name, Duration, fees,ShortName } = req.body
    try {
        let arr=[];
        if (!Name) {
            arr.push("Required Name field")
        }
        if (!Duration) {
            arr.push("Required Duration field")
        }
        if (!fees) {
            arr.push("Required fees field")
        }
        if (!ShortName) {
            arr.push("Required ShortName field")
        }

        if(arr.length>0){
            res.send(sendResponse(false,arr,'Required all fields')).status(400)
            return;
        }else{
            let obj = { Name, Duration, fees,ShortName }
            let course = new CourseModel(obj);
            await course.save()
            if(!course){
                res.send(sendResponse(false,null,"Internal server error")).status(400)
            }else{
                res.send(sendResponse(true,course,"Saved Successfully")).status(400)    
            }
        }
        
    }catch(e){
        res.send(sendResponse(false,null,"Internal server error")).status(400)   }
})

route.put("/:id", (req, res) => {
    res.send("Edit Single institute data")
})

route.delete("/:id", (req, res) => {
    res.send("Delete Single institute data")
})

module.exports = route;


