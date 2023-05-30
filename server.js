const fs = require("fs");
const http = require("http")

// readdir = read directory, first parament is of path, second for error and directory
// fs.readdir('./',(err, file)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(file)
//     }
// })

// to read a file we need to give the path of file along with its name 
// to make the file readable add also utf-8
// fs.readFile('abc.txt',"utf-8", (err, file) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(file)
//     }
// })


// to write in a file enter the file name along its path and the text you want to write
// overwrites the text, if empty then writes
// fs.writeFile("./abc.txt","Hello world",(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("File written successfully")
//     }
// })

// appends the text, if file not created so creates then adds text
// fs.appendFile("./abc.txt", "My name is Muhammad Ali", (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("File written successfully")
//     }
// })

// checks the existence of file
// fs.stat("./abcd.txt",(err)=>{
//     if(!err){
//         console.log("File exists")
//     }else if(err.code=="ENOENT"){
//         console.log("File does not exists")
//     }
// })

// page no.62 (function not working cheeck error)
// fs.readFile('./abc.txt',"utf-8",(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//         var value = data.replace('/Hello/gim',"Bye");

//         fs.writeFile("./abc.txt",value,(err)=>{
//            if(err){
//             console.log(err)
//            }
//         })
//     }
// })

// let courses = [
//     {
//         id:1,
//         name:'ABC'
//     },
//     {
//         id:2,
//         name:'ABCD'
//     },
//     {
//         id:3,
//         name:'ABCDE'
//     },
// ]

// req.body gets the object from outside when post hits

// const server = http.createServer((req,res)=>{
//     if(req.url=="/courses"){
//         // res.write("Courses Route is working");
//         if(req.method=="GET"){
//             res.write(JSON.stringify(courses))
//         }
//         if(req.method=="POST"){
//             req.body
//             res.write(JSON.stringify(courses))
//         }
//         res.end()
//     }

//     if(req.url=="/users"){
//         res.write("Users Route is working")
//         res.end(); 
//     }
// })

// server.listen(5000)


// const express = require("express")

// const app =express()

// let courses = [
//     {
//         id:1,
//         name:'ABC'
//     },
//     {
//         id:2,
//         name:'ABCD'
//     },
//     {
//         id:3,
//         name:'ABCDE'
//     },
// ]

// app.get('/',(req,res)=>{
//     res.send("get request")
// })

// app.get("/courses",(req,res)=>{
//     res.json(courses)
// })

// app.get("/courses/:id",(req,res)=>{
//     let id = req.params.id
//     let obj = courses.find((x)=>x.id==id);
//     if(obj){
//         res.send(obj).status(200)
//     }else{
//         res.send("No data found").status(404)
//     }
// })


// app.post("/courses",(req,res)=>{})
// app.put("/courses/:id",(req,res)=>{})
// app.delete("/courses/:id",(req,res)=>{})
// app.listen(5000,()=>{
//     console.log("server is listening on this port 5000")
// })

const express = require("express");

const app = express();
const cors= require("cors")
require("dotenv").config();
const mongoose = require("mongoose")
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' 
  }));
const Student = require("./routes/studentRoute");
const Teacher = require("./routes/teacherRoute");
const Institute = require("./routes/instituteRoute");
const Course = require("./routes/courseRoute");


app.use("/api/Student", Student);
app.use("/api/Teacher", Teacher);
app.use("/api/Institute", Institute);
app.use("/api/Course", Course);



mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Database connected successfully and server is listening on this port 5000")
    })
}).catch((err) => {
    console.log(err)
})
    


