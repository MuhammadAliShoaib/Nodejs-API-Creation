const express = require("express");

const route = express.Router();
const StudentModel = require("../models/studentModel")
const { sendResponse } = require("../helper/helper");


route.get('/', async (req, res) => {
    try {
        const result = await StudentModel.find();
        if (!result) {
            res.send(sendResponse(false, null, "No data Found")).status(404)
        } else {
            res.send(sendResponse(true, result)).status(400)
        }

    } catch (e) {
        console.log(e)
        res.send(sendResponse(false)).status(404)
    }
});

route.get("/search", async (req, res) => {
    let { firstName, LastName } = req.body;
    if (firstName) {
      let result = await StudentModel.find({
        firstName: firstName,
        LastName: LastName,
      });
      if (!result) {
        res.send(sendResponse(false, null, "No Data Found")).status(404);
      } else {
        res.send(sendResponse(true, result)).status(200);
      }
    }
  });

route.get("/:id", async (req, res) => {
    try {
        let id = req.params.id
        const result = await StudentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No data Found")).status(404)
        } else {
            res.send(sendResponse(true, result)).status(400)
        }

    } catch (e) {
        console.log(e)
        res.send(sendResponse(false)).status(404)
    }
})


route.post("/", async (req, res) => {
    let { firstName, lastName, contact, course } = req.body;
    try {

        let arr = []
        if (!firstName) {
            arr.push('Required : First Name')
        }
        if (!contact) {
            arr.push('Required : Contact')
        }
        if (!course) {
            arr.push('Required : Course')
        }

        if (arr.length > 0) {
            res.send(sendResponse(false, arr, null, "Required all fields")).status(400)
            return;
        } else {
            let obj = { firstName, lastName, contact, course };
            let student = new StudentModel(obj);
            await student.save()
            if (!student) {
                res.send(sendResponse(false, null, "internal server error")).status(400)
            } else {
                res.send(sendResponse(true, student, "Saved successfully")).status(200)
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Internal server error")).status(400)
    }
})

route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await StudentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
            let updateResult = await StudentModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updateResult) {
                res.send(sendResponse(false, null, "Error")).status(404);
            } else {
                res
                    .send(sendResponse(true, updateResult, "Updated Successfully"))
                    .status(200);
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, "Error")).status(400);
    }
});

route.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let result = await StudentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "Data not found on this id")).status(404)
        } else {
            let deleteResult = await StudentModel.findByIdAndDelete(id)
            if (!deleteResult) {
                res.send(sendResponse(false, null, "Error")).status(400)
            } else {
                res.send(sendResponse(false, null, "Deleted Successfully")).status(200)
            }
        }
        
    } catch (e) {
        res.send(sendResponse(false, null, "Error")).status(400);
    }
})


module.exports = route;


