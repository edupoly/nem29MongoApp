var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    firstname:String,
    lastname:String
})

var Student = mongoose.model("Student",studentSchema)

module.exports=Student;