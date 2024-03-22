const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StoreOffersSchema = new Schema({

  OfferID: {
    type: String,
    unique: true,
  },
  OfferName :{
    type: String,
},
StoreName: {
    type: String,
    require: true
 },
   DiscountPercentage :{
         type: String,
         require: true
   },
   contactNumber : {
    type: Number,
    require: true
},
   
 Description: {
    type: String,
    require: true
 },
 Period: {
    type: String,
    require: true
 },
})

// Middleware to generate UserID before saving the document
StoreOffersSchema.pre('save', async function (next) {
  try {
      if (!this.isNew) {
          // If the document is not new, do not generate a new ID
          return next();
      }

      // Find the highest FloorID
      const highestOffers = await this.constructor.findOne({}, {}, { sort: { OfferID: -1 } });

      let lastID = 1;
      if (highestOffers) {
          // Extract the number part of the highest FloorID and increment it
          lastID = parseInt(highestOffers.OfferID.split('_')[1]) + 1;
      }

      // Create the new FloorID by combining the prefix and the incremented number
      this.OfferID = `user_${lastID}`;

      next();
  } catch (error) {
      next(error);
  }
});

const StoreOffers = mongoose.model("StoreOffers", StoreOffersSchema);
module.exports = StoreOffers;