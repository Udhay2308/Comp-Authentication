const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-Parser")


const app = express()
app.use(cookieParser())

app.use(express.json())
app.use("/api/auth",authRouter)
module.exports = app