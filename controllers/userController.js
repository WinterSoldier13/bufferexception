const User = require('../models/User');


exports.getUser = (req,res) =>
{
    let userNamePassed = req.params.username;

    User.findOne({"username": userNamePassed}, null,(err,user)=>
    {
        if(err || !user)
        {
            return res.status(400).json(
                {
                    error: "USER NOT FOUND IN DATABASE"
                }
            )
        }
        else
        {
            user.salt = undefined;
            user.encryPassword = undefined;
            return res.json(user);
        }
    }
    )
    
}