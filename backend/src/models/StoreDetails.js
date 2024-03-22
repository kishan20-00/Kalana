const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StoreDetailsSchema = new Schema({

  StoreID: {
    type: String,
    unique: true,
  },
  StoreName :{
    type: String,
},
   Email :{
         type: String,
         unique: true,
         require: true
   },
   contactNumber : {
    type: Number,
    require: true
},
   Location: {
    type: String,
    require: true
 },
 Category: {
    type: String,
    require: true
 },
 OpeningTime: {
    type: String,
    require: true
 },
})

// Middleware to generate UserID before saving the document
StoreDetailsSchema.pre('save', async function (next) {
   try {
       if (!this.isNew) {
           // If the document is not new, do not generate a new ID
           return next();
       }
 
       // Find the highest FloorID
       const highestDetail = await this.constructor.findOne({}, {}, { sort: { StoreID: -1 } });
 
       let lastID = 1;
       if (highestDetail) {
           // Extract the number part of the highest FloorID and increment it
           lastID = parseInt(highestDetail.StoreID.split('_')[1]) + 1;
       }
 
       // Create the new FloorID by combining the prefix and the incremented number
       this.StoreID = `user_${lastID}`;
 
       next();
   } catch (error) {
       next(error);
   }
 });

const StoreDetails = mongoose.model("StoreDetails", StoreDetailsSchema);
module.exports = StoreDetails;