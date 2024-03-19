const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StoreItemsSchema = new Schema({

  ItemID: {
    type: String,
    unique: true,
  },
  ItemName :{
    type: String,
},
StoreName: {
    type: String,
    require: true
 },
Price :{
         type: String,
         require: true
   },
 Description: {
    type: String,
    require: true
 },
 Stock: {
    type: String,
    require: true
 },

  
})

const StoreItems = mongoose.model("StoreItems", StoreItemsSchema);
module.exports = StoreItems;