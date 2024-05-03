const express = require("express");
const cors = require("cors");
const  mongoose = require('mongoose');
require("dotenv").config();
const bodyParser = require('body-parser');

const app = express();
// Enable all CORS requests
app.use(cors());

app.use(express.json());

//user router
const userRouter = require("./routes/userRoutes.js");
app.use("/user", userRouter);

//store Details router
const storeDetailRouter = require("./routes/storeDetailsRoutes.js");
app.use("/store", storeDetailRouter);

//store Offers router
const storeOfferRouter = require("./routes/storeOffersRoutes.js");
app.use("/offer", storeOfferRouter);

//store Items router
const storeItemRouter = require("./routes/storeItemsRoutes.js");
app.use("/item", storeItemRouter);

// Define parking slot schema and model
const parkingSlotSchema = new mongoose.Schema({
  slotNumber: Number,
  isOccupied: Boolean,
});

const ParkingSlot = mongoose.model('ParkingSlot', parkingSlotSchema);

app.use(bodyParser.json());

// API endpoints
app.get('/api/parking-slots', async (req, res) => {
  try {
    const parkingSlots = await ParkingSlot.find();
    res.json(parkingSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/parking-slots/:id/occupy', async (req, res) => {
  try {
    const { id } = req.params;
    const parkingSlot = await ParkingSlot.findByIdAndUpdate(id, { isOccupied: true }, { new: true });
    res.json(parkingSlot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Backend route to vacate a parking slot
app.post('/api/parking-slots/:id/vacate', async (req, res) => {
  try {
    const { id } = req.params;
    const parkingSlot = await ParkingSlot.findByIdAndUpdate(id, { isOccupied: false }, { new: true });
    res.json(parkingSlot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


const initialize = async () => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECT_URL);
      console.log("Mongodb connection success!");
    } catch (e) {
      console.log(e);
    }
  };
  
  const startServer = async () => {
    await initialize();
    app.listen(process.env.PORT || 8000);
    console.log('Server started');
  };
  
  startServer();