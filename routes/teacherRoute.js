const express = require("express");
const TeacherModel = require("../models/teacherModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get('/', async (req, res) => {
    const result = await TeacherModel.find()
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
    res.send("Get Single teacher data")
})


route.post("/", async(req, res) => {
    let { name, course, contact } = req.body
    try {
        let arr=[];
        if (!name) {
            arr.push("Required name field")
        }
        if (!course) {
            arr.push("Required name field")
        }
        if (!contact) {
            arr.push("Required name field")
        }

        if(arr.length>0){
            res.send(sendResponse(false,arr,'Required all fields')).status(400)
            return;
        }else{
            let obj = { name, course, contact }
            let teacher = new TeacherModel(obj);
            await teacher.save()
            if(!teacher){
                res.send(sendResponse(false,null,"Internal server error")).status(400)
            }else{
                res.send(sendResponse(true,teacher,"Saved Successfully")).status(400)    
            }
        }
        
    }catch(e){
        res.send(sendResponse(false,null,"Internal server error")).status(400)   }
})

route.put("/:id", (req, res) => {
    res.send("Edit Single teacher data")
})

route.delete("/:id", (req, res) => {
    res.send("Delete Single teacher data")
})

module.exports = route;


