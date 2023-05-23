const express = require("express");
const InstituteModel = require("../models/instituteModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get('/', async (req, res) => {
    const result = await InstituteModel.find()
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
    let { Name, Address, Telephone } = req.body
    try {
        let arr=[];
        if (!Name) {
            arr.push("Required Name field")
        }
        if (!Address) {
            arr.push("Required Address field")
        }
        if (!Telephone) {
            arr.push("Required Telephone field")
        }

        if(arr.length>0){
            res.send(sendResponse(false,arr,'Required all fields')).status(400)
            return;
        }else{
            let obj = { Name, Address, Telephone }
            let institute = new InstituteModel(obj);
            await institute.save()
            if(!institute){
                res.send(sendResponse(false,null,"Internal server error")).status(400)
            }else{
                res.send(sendResponse(true,institute,"Saved Successfully")).status(400)    
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


