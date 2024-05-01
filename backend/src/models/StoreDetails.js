const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreDetailsSchema = new Schema({
  StoreName: {
    type: String,
  },
  StoreImage: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
    require: true,
  },
  contactNumber: {
    type: Number,
    require: true,
  },
  Location: {
    type: String,
    require: true,
  },
  Category: {
    type: String,
    require: true,
  },
  OpeningTime: {
    type: String,
    require: true,
  },
});

const StoreDetails = mongoose.model("StoreDetails", StoreDetailsSchema);
module.exports = StoreDetails;
