const parking = require("../models/Parking");

//add new Vehicle for system
exports.addNewParking= async (req, res) => {
 
  //constant variables for the attributes
  const {
    name,
     email,
     contactNumber,
     password,
   } = req.body;


        const newUser = new userDetails({
          name,
           email,
           contactNumber,
           password,
      })
  
      newUser.save().then(() => {
           res.json("User Added")
  
      }).catch((err) => {
        
      })
    .catch((err) =>{
      
  })
  };