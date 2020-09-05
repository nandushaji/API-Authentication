const router = require('express').Router();
const User = require('../model/User');
const {registerValidate,loginValidate} = require('../validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register',async (req, res) =>{
    const {error }=registerValidate(req);
    if(error){
        return res.status(400).send(error.details[0].message);;
     }
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) {
        return res.status(400).send('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPswd= await bcrypt.hash(req.body.password,salt);
    
        const user =  new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPswd
    });
    
    try{
        const savedUser =await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
});


router.post('/login',async (req,res)=>{
    const {error }=loginValidate(req);
    if(error){
        return res.status(400).send(error.details[0].message);;
     }
    const user = await User.findOne({email:req.body.email});
    if(!user) {
        return res.status(400).send('Email do not exist');
    }
    const validPswd = await bcrypt.compare(req.body.password,user.password)
    if(!validPswd){
        return res.status(400).send('invalid password');
    }
    //token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SCT);
    res.header('auth-token', token);

    res.send('Log in success!!');

});




module.exports = router;