const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const studentdata = require("./InitialData");
const student = require("./models/student");
const mongoose = require("mongoose");
const idCounter = require("./models/idCounter");
mongoose.connect("mongodb://localhost/student",()=>console.log("DB is connected"));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// your code goes here

app.get("/api/student",async (req,res)=>{
    try{
        const data = await student.find().sort({id:1});
        res.status(200).json({data});
    }
    catch{
        res.sendStatus(404)
    }
    
});

app.get("/api/student/:id",async (req,res)=>{
    try{
        const data  = await student.find({id:req.params.id});
        res.status(200).json(data);
    }catch(e){
        res.sendStatus(404);
    }
});

app.post("/api/student",async (req,res)=>{
    
    try{
        const Empty = await idCounter.find().count();
        if(Empty===0){
            const last_data = await student.find().sort({id:-1}).limit(1);
            var newId = parseInt(last_data[0].id)+1;
            
        }else{
            const lastId = await idCounter.find().sort({id:-1}).limit(1);
            var newId = parseInt(lastId[0].id)+1;
        }
        req.body.id = newId;
        await idCounter.create({id:newId});
        await student.create(req.body);
        res.json({id:newId});
    }catch(e){
        res.sendStatus(400);
    }
   
});

app.put("/api/student/:id",async(req,res)=>{
    
    try{ 
        if(req.body.name){
            await student.updateOne({id:req.params.id},{name:req.body.name})
        }

        if(req.body.currentClass){
            await student.updateOne({id:req.params.id},{currentClass:req.body.currentClass})
        }

        if(req.body.division){
            await student.updateOne({id:req.params.id},{division:req.body.division})
        }
        const results  = await student.find({id:req.params.id});
        res.json(results);
        
    }catch{
        res.sendStatus(400);
    }
});

app.delete("/api/student/:id",async(req,res)=>{
    try{
         await student.deleteOne({id:req.params.id});
         res.json({message:"Student deleted"})
    }catch{
        res.sendStatus(404);
    }
});




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   