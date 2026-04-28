const mongoose = require("mongoose")

function connecttoDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to database..")
    })
}

module.exports = connecttoDB