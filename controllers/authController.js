let User = require('../models/User');
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
// const passport = require('passport');
// const expressSession = require('express-session');



exports.signup = (req,res)=>
{



    const errors = validationResult(req);

    if (!errors.isEmpty())
     {
      return res.status(422).json(
        
        {
        error: errors.array()[0].msg
        }
      );
    }

    else
    {
        user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            instituteName: req.body.instituteName,
            password: req.body.password
        })
        user.save((err,user) => {
            if(err || !user)
            {
                return res.status(400).json({
                    error: err['keyValue']
                })
            }
            else
            {
                return res.json(user);  
                // Change the above line
            }
        })
    }

}



exports.signin = (req,res) =>
{
    const errors = validationResult(req);

    if (!errors.isEmpty())
     {
      return res.status(422).json(
        {
        error: errors.array()[0].msg
        }
      );
    }
    else
    {
        const{username ,password} = req.body;
        
        User.findOne({ username }, (err, user) =>
         {
            if (err || !user) {
              return res.status(400).json({
                error: "USERNAME does not exists"
              });
            }
        
            if (!user.autheticate(password)) 
            {
              return res.status(401).json(
                {
                error: "Email and password do not match"
                }
              );
            }
            else
            {
                //create token
                const token = jwt.sign({ username: user.username }, process.env.SECRET);
                //put token in cookie
                res.cookie("token", token, { expire: new Date() + 9999 });

                //send response to front end
                const { _id, name, username, role , email } = user;

                return res.status(200)
                .json({ token, user: { _id, name, username, role, email } });
            

            }
        });
    }
    
}

exports.signout = (req,res) =>
{
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });

}


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
  });