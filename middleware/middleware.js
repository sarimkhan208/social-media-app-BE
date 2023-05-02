const jwt = require("jsonwebtoken")
const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token.split(" ")[1],"sarim")
            if(decoded){
                req.body.userID = decoded.userID
                next()
            }else{
                res.status(200).send({"msg":"pls login first"})
            }
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.status(200).send({"msg":"pls login first"})
    }

}

module.exports=auth