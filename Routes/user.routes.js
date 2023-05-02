const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

userRouter.post("/register",async (req,res)=>{
    const {password} = req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(hash){
                const user = new UserModel({...req.body,password:hash})
                await user.save()
                res.status(200).send({"msg":"User registeres successfull"})
                
            }else{
                res.status(400).send({"err":err.message})
            }
        })
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email:email})


    try{
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                let token = jwt.sign({userID:user._id},"sarim")
                res.status(200).send({"msg":"login successfull","token":token})
            }else{
                res.status(200).send({"msg":"wrong credentials"})
            }
        })
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


module.exports=userRouter