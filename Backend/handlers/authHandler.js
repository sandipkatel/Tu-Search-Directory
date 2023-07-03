const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

exports.loginHandler = (req, res, next) => {
    let email = req.body.email;
    let hashedPassword = req.body.password;

    User.findbyMail(
        email, ([result]) => {
            if(result) {
                if(result.password === hashedPassword) {
                    let token = jwt.sign({email: email}, process.env.SALT, {expiresIn:'2h'});
                    res.status(200).json({message: "Login Successful!", token: token, name: result.name, email: result.email, admin: result.admin});
                    next();

                } else {
                    res.status(400).json({message: "Password is Incorrect"});
                    next();
   
                }
            } else {
                res.status(400).json({message: "The E-Mail Hasn't Been Registered!"});
                next();

            }
        },
        (err) => {
            console.log(err);
            res.status(500).json({message: "Server Error! Try Again Later"});
            next();

        }
    );

}


exports.signupHandler = (req,res,next) => {
    let name = req.body.name;
    let email = req.body.email;
    let hashedPassword = req.body.password;
     
    User.findbyMail(email, (searchResult) =>{
        console.log('search:',searchResult);
        if(searchResult.length !== 0) {
            res.status(400).json({message: 'Account Creation Failed!', isAuth: false});
        } else {
            let newUser = new User(null, name, email, hashedPassword, false);
            newUser.save();
            res.status(201).json({message: 'Account Created Successfully', isAuth: true});
        }
        next();
    } 
    ,
    (err) => {
        console.log(err);
        res.status(500).json({message: "Server Error! Try Again Later", isAuth: false});
        next();
    }
    );
    
}