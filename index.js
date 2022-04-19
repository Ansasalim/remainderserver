// import express
const express = require('express')

const dataservice=require('./services/data_service')

const jwt=require('jsonwebtoken')

const cors=require('cors')

// create an  server app using express
const app= express()

// use cors to specify origin
app.use(cors({
    origin:'http://localhost:4200'
}))

// set up the port number
app.listen(3000,()=>{
    console.log("server started at port number:3000");
    })

    // to parse json
app.use(express.json())

// Application specific middleware
// const appMiddleware=(req,res,next)=>{
//     console.log("Application specific middleware")
//     next()
// }

// app.use(appMiddleware)

// bank app - API

// jwt token-to verify token
// const jwtMiddleware =(req,res,next)=>{

//  try{  
//       const token=req.headers["x-access-token"]
//     // verify token
// const data=jwt.verify(token,'supersecretkey123')
// req.currentUserid=data.currentUserid
// next()
// }
// catch{
//     res.status(422).json({
//         statusCode:422,
//         status:false,
//         message:"please log in"
//     })
// }
// }

// register- API
app.post('/register',(req,res)=>{

    dataservice.register(req.body.userid,req.body.password,req.body.uname)
    .then(result=>{
       res.status(result.statusCode).json(result)
    })
   
   })


   // login- API
app.post('/login',(req,res)=>{

    dataservice.login(req.body.userid,req.body.password)
     .then(result=>{
         res.status(result.statusCode).json(result)
     })
    })

       // event- API
app.post('/home',(req,res)=>{

    dataservice.event(req.body.userid,req.body.date,req.body.description)
     .then(result=>{
         res.status(result.statusCode).json(result)
     })
    })

    // view event
    app.post('/viewevent',(req,res)=>{

        dataservice.getHistory(req.body.userid)
         .then(result=>{
             res.status(result.statusCode).json(result)
         })
        })
    
        // delete API
app.delete('/deleteAcc/:userid',(req,res)=>{
    // asynchronous
    dataservice.deleteAcc(req.params.userid)
    .then(result=>{
    res.status(result.statusCode).json(result) 
})
})