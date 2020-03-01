var express = require('express')
var router = express.Router()
const myPlaintextPassword = require('../model/app_config').password
const app_config = require('../model/app_config')
const bcrypt = require('bcrypt')
const User = require('../model/User')
const valid = require('../model/User_Validation_Schema') //user details validation
const login_valid = require('../model/login_validate')
const jwt = require('jsonwebtoken')
//now we define our routes and export router so that the main index.js can refer to this for routing
router.all('*/',(req,res,next)=>{
    
    if(req.header('validation')){
        
        bcrypt.compare(myPlaintextPassword, req.header('validation'), function(err, result) {
            
            if(result==true)
                next();
            else
                res.status(403).send({'message':'error','details':'This API can be accessed only from Authorized Application'})
        });
    }

    else{
        res.status(403).send({'message':'error','details':'This API can be accessed only from Authorized Application'})
    }
})


router.post('/',(req,res)=>{
    res.json({'message':'success'})
})

router.post('/register', async(req,res)=>{

    //client side validation errors
     const {error} = valid(req);
     if(error)
        return res.status(400).send({'message':'error','details':error.details[0].message})


    const salt = bcrypt.genSaltSync(app_config.SALT_ROUNDS);
    const hash = await bcrypt.hash(req.body.password,salt)

     //check if email is unique 
    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists)
        return res.status(400).send({'message':'error','details':'Email already exists'})



    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hash
    });

    

    //save user to database
    try{
        const savedUser = await user.save(); 
        res.send({'message':'success','details':savedUser})
    }catch(err){
         res.send({'message':'error','details':err})
        
    }
})

router.post('/login',async (req,res)=>{
    const {error} = login_valid(req);
    if(error)
        return res.status(400).send({'message':'error','details':error.details[0].message})
    
    const userData = await User.findOne({email:req.body.email})
    if(!userData)
        return res.status(400).send({'message':'error','details':'email or password not matching'})

    const validPassword = await bcrypt.compare(req.body.password,userData.password)

    if(!validPassword)
        return res.send({'message':'error','details':'email or password not matching'})

        
        const token = jwt.sign({_id:userData._id},app_config.TOKEN_SECRET)
        res.header('auth-token',token)
        res.send({'message':'success','details':'Logged in'})
        
    

})


module.exports = router