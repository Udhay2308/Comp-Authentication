const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email: {
        type : String,
        unique:[true,"User already exists with this email..."]
    },
    password:String,
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel