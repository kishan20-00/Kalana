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

const StoreOffers = mongoose.model("StoreOffers", StoreOffersSchema);
module.exports = StoreOffers;