const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name : {
        type : String,
        min : 5,
        required : true
    },
    email : { 
        type : String,
        min : 10,
        required : true
    },
    password : {
        type : String,
        min : 10,
        required : true
    }

})

module.exports = mongoose.model("testingPractice", UserSchema)