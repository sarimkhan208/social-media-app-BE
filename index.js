const express = require("express")
const connection = require("./connections/connection")
const userRouter = require("./Routes/user.routes")
const postRouter = require("./Routes/post.routes")
const auth = require("./middleware/middleware")
const app = express()
const cors = require("cors")
require("dotenv").config()

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(auth)
app.use("/post",postRouter)



app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connected to mongoDB")
    }catch(err){
        console.log(err)
    }
    console.log(`server is running at PORT : ${process.env.PORT}`)
})

