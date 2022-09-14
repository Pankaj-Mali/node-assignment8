const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id:{type:Number},
    name:{type:String,required:true},
    currentClass:{type:Number,required:true},
    division:{type:String,required:true},
});

const student = mongoose.model("student",studentSchema);

module.exports = student;