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

// Middleware to generate UserID before saving the document
StoreItemsSchema.pre('save', async function (next) {
  try {
      if (!this.isNew) {
          // If the document is not new, do not generate a new ID
          return next();
      }

      // Find the highest FloorID
      const highestItems = await this.constructor.findOne({}, {}, { sort: { ItemID: -1 } });

      let lastID = 1;
      if (highestItems) {
          // Extract the number part of the highest FloorID and increment it
          lastID = parseInt(highestItems.ItemID.split('_')[1]) + 1;
      }

      // Create the new FloorID by combining the prefix and the incremented number
      this.ItemID = `user_${lastID}`;

      next();
  } catch (error) {
      next(error);
  }
});

const StoreItems = mongoose.model("StoreItems", StoreItemsSchema);
module.exports = StoreItems;