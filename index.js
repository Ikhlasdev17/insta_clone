const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
const mongoose = require("mongoose")
const authRouter = require("./routes/authRoute")
const postRouter = require("./routes/postsRoute")
const userRouter = require("./routes/userRoute")
const path = require("path")
const port = process.env.port || 5000

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/user', userRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

function connectDB(){
  try {
    mongoose.connect(process.env.MONGO_DB, (err) => {
      if (err) return console.log("Error connect to DB");

      console.log("MongoDB Successfull connected!");
    })
  } catch (error) {
    console.log(error);
  }
}

connectDB()

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))