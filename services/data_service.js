const db = require('./db')


const register = (userid, pswd, uname) => {

    // asynchronous
    return db.Remainder.findOne({ userid })
      .then(data => {
        if (data) {
          return {
            statusCode: 422,
            status: false,
            message: "User already exist....please login..."
          }
        }
        else {
          const newRemainder = new db.Remainder({
            userid,
            pswd,
            uname,
            events: []
          })
          newRemainder.save()
          return {
            statusCode: 200,
            status: true,
            message: "successfully registered"
          }
        }
  
      })
    }

    
const login = (userid, pswd) => {
    // asynchronous
    return db.Remainder.findOne({ userid, pswd })
      .then(data => {
        if (data) {
          currentUserid = userid
          console.log(data);
          currentUname = data.uname
  
          // token generation
          // const token = jwt.sign({
          //   currentUserid : userid
          // }, 'supersecretkey123')
  
          return {
            statusCode: 200,
            status: true,
            message: "successfully login!!!!!",
            currentUserid,
            currentUname
          }
        }
        else {
          return {
            statusCode: 422,
            status: false,
            message: "incorrect password/user id"
          }
        }
      })
  }

  // event
const event = (userid,date,description) => {
// userId=""
  // asynchronous
  return db.Remainder.findOne({ userid })
    .then(data => {
      if (data) {
       data.event.push({
     date,
     description
        })
        data.save()
        return {
          statusCode: 200,
          status: true,
          message: "remainder added successfully "
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorrect password/account number"
        }
      }
    })
}


const getHistory= (userid) => {

  // asynchronous
  return db.Remainder.findOne({ userid})
.then(data=>{
  if (data) {
    return {
      statusCode: 200,
      status: true,
     event: data.event
    }
  }
  else{
    return {
      statusCode: 422,
      status: false,
      message: "user does not exist"
    }
  }

})
 
}
const deleteAcc=(acno)=>{
  // asynchronous
  return db.User.deleteOne({userid})
  .then(user=>{
    if(!user){
      return{
        statusCode: 422,
      status: false,
      message: "Failed"
      }
    }
  return{
    statusCode: 200,
      status: true,
      message: "remone the event"
  }
  })
}

module.exports = {
    register,
    login,
    event,
    getHistory,
    deleteAcc
  }