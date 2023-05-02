const express = require("express")
const postRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const PostModel = require("../models/post.model")

postRouter.post("/create",async (req,res)=>{
    console.log(req.body)
    try{
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"Post successfull"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

postRouter.get("/",async (req,res)=>{
    try{
        const post = await PostModel.find()
        res.status(200).send(post)
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const data = await PostModel.findOne({_id:id})
    try{
        if(req.body.userID !== data.userID){
            res.status(200).send({"msg":"you are not authorized to do this actions"})
        }else{
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"post has been updated"})

        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const data = await PostModel.find()
    console.log(data)
    // console.log(id)
    try{
        if(req.body.userID !== data.userID){
            res.status(200).send({"msg":"you are not authorized to do this actions"})
        }else{
            await PostModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"post has been deleted"})
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

module.exports = postRouter