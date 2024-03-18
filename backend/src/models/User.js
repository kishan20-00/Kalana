const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

  role: {
    type: String,
    default:"user",
  },
  userID:{
    type: String,
    unique:true,
  },
  name :{
    type: String,
    require: true
},
   email :{
         type: String,
         unique: true,
         require: true
   },
   
   contactNumber : {
    type: Number,
    require: true
},
   password: {
    type: String,
    require: true
 },

  
})

const User = mongoose.model("User", UserSchema);
module.exports = User;