const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports = {
    signup : async (req, res, next)=>{
        try {
            const {userName, email, password} = req.body;
            // Find a user with the same userName
            const user = await User.findOne({userName : userName});

            // Create new user
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
                // Reject with confict error
                res.status(409).json({
                    success : false,
                    message : "userName is used try another one"
                })    
            }
        } catch (error) {
            // Handle internal server error
            res.status(500).json({
                success : false,
                message : error
            })
        }

    },
    signin : async (req, res, next) =>{
        try {
            const {sign_userName, sign_password} = req.body;

            // Find user with the same userName
            const user = await User.findOne({userName : sign_userName});
            if(user){
                // Check if password matched
                const match = await user.isValidPassword(sign_password);
                if(match){
                    // Sign user
                    const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
                    // cookies last for 1 day and is httpOnly for security reasons
                    res.cookie('authcookie', accessToken,{maxAge:86400000,httpOnly:true});
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
        
    }, 
    logout : (req, res, next)=>{
        // Cookies is httpOnly for security reason, so clearing cookies allowed only from server
        res.clearCookie("authcookie");
        res.end();
    }
}