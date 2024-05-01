const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StoreItemsSchema = new Schema({

  ItemName:{
    type: String,
    require:true
},
ItemImage:{
  type: String,
  require:true
},
StoreName: {
    type: String,
    require: true
 },
Price:{
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