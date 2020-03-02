var express = require('express')
var bodyParser = require('body-parser')
const path = require('path');
var route = require('./routes/route')
var https= require('https')
var fs = require('fs')
var app = express()
const mongoose = require('mongoose')
const private = require('./routes/private/user_route')


mongoose.connect('mongodb://localhost:27017/darpa_069', {useNewUrlParser: true,useUnifiedTopology: true},()=>{
console.log("Connected to db")
})

app.set('port',process.env.PORT || 3000) // this will set the 'port' variable to either environment defined or if not then 3000

//we now define our view engine
//this is not needed for api based servers

//Middleware
app.set('views',__dirname + '/views') //this tells the view engine to look under __dirname/views for the template file
app.set('view engine','ejs') //set the view engine to ejs

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //bodyParser middleware allows us to access request data easily

app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder


//Note app.set() allows us to set variables globally, and we can get the value back using app.get()

app.all('/*',(req,res,next)=>{
    //we set the CORS headers here
    next() //go to the next layer in the stack
})



//Route Middleware
app.use('/api',route) // all routes will start with api
app.use('/api/access',private) //all private routes

app.use((req,res,next)=>{
    res.json({'message':'error','details':'Invalid URL'})
})  //this will be called when there is no matching route

const options = {
    key : fs.readFileSync('server.key'),
    cert : fs.readFileSync('server.cert')
} //we will be self signing for testing purpose. In production server we will use CA



https.createServer(options,app).listen(app.get('port'),()=>{
      console.log(`Server running in port ${app.get('port')}`)
  });






