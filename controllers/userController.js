const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports = {
    signup : async (req, res, next)=>{
        try {
            const {userName, email, password} = req.body;
            const user = await User.findOne({userName : userName});
            if(!user){
                const newUser = new User({
                    userName, 
                    email, 
                    password
                })
                await newUser.save()       
                res.status(200).json({
                    success : true,
                    message : "User Signed up"
                })     
            }else{
                res.status(500).json({
                    success : false,
                    message : "userName is used try another one"
                })    
            }
        } catch (error) {
            res.status(500).json({
                success : false,
                message : error
            })
        }

    },
    signin : async (req, res, next) =>{
        try {
            const {sign_userName, sign_password} = req.body;
            const user = await User.findOne({userName : sign_userName});
            if(user){
                const match = await user.isValidPassword(sign_password);
                console.log("match", match)
                if(match){
                    const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
                    res.cookie('authcookie', accessToken,{maxAge:900000,httpOnly:true});
                    res.status(200).json({
                        success : true,
                        message : "user signed in successfully"
                    })
                }else{
                    res.status(401).json({
                        success : false,
                        message : "unauthorized"
                    })
                }
            }else{
                res.status(401).json({
                    success : false,
                    message : "unauthorized"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : error
            })
        }
    },
    checkToken : async (req, res, next)=>{
       //get authcookie from request
        const authcookie = req.cookies.authcookie
        if(authcookie){
            //verify token which is in cookie value
            jwt.verify(authcookie,process.env.SECRET_KEY,(err,data)=>{
                if(err){
                    console.log(err)
                    res.sendStatus(403)
                } 
                else if(data){
                    req.user = data
                    next()
                }
            })
        }else{
            res.sendStatus(401)
        }
        
    }
}