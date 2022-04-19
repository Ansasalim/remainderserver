const mongoose =require('mongoose')

// state connection string
mongoose.connect('mongodb://localhost:27017/remainderapp',{
    useNewUrlParser:true
})

// model creation
const  Remainder =mongoose.model('Remainder',{
userid: String, 
uname:String,
pswd: String,
   event: [] 
})

// Export model -User
module.exports={
    Remainder
}