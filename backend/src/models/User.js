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

// Middleware to generate UserID before saving the document
UserSchema.pre('save', async function (next) {
  try {
      if (!this.isNew) {
          // If the document is not new, do not generate a new ID
          return next();
      }

      // Find the highest FloorID
      const highestUser = await this.constructor.findOne({}, {}, { sort: { userID: -1 } });

      let lastID = 1;
      if (highestUser) {
          // Extract the number part of the highest FloorID and increment it
          lastID = parseInt(highestUser.userID.split('_')[1]) + 1;
      }

      // Create the new FloorID by combining the prefix and the incremented number
      this.userID = `user_${lastID}`;

      next();
  } catch (error) {
      next(error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;