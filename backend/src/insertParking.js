const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Kishan:Joker@cluster0.2g59arm.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define parking slot schema and model
const parkingSlotSchema = new mongoose.Schema({
  slotNumber: Number,
  isOccupied: Boolean,
});

const ParkingSlot = mongoose.model('ParkingSlot', parkingSlotSchema);

// Insert parking slots
const parkingSlots = [
  { slotNumber: 1, isOccupied: false },
  { slotNumber: 2, isOccupied: false },
  { slotNumber: 3, isOccupied: false },
  { slotNumber: 4, isOccupied: false },
  { slotNumber: 5, isOccupied: false },
  { slotNumber: 6, isOccupied: false },
  { slotNumber: 7, isOccupied: false },
  { slotNumber: 8, isOccupied: false },
  { slotNumber: 9, isOccupied: false },
  { slotNumber: 10, isOccupied: false },
  { slotNumber: 11, isOccupied: false },
  { slotNumber: 12, isOccupied: false },
  { slotNumber: 13, isOccupied: false },
  { slotNumber: 14, isOccupied: false },
  { slotNumber: 15, isOccupied: false },
  { slotNumber: 16, isOccupied: false },
  { slotNumber: 17, isOccupied: false },
  { slotNumber: 18, isOccupied: false },
  { slotNumber: 19, isOccupied: false },
  { slotNumber: 20, isOccupied: false },
  { slotNumber: 21, isOccupied: false },
  { slotNumber: 22, isOccupied: false },
  { slotNumber: 23, isOccupied: false },
  { slotNumber: 24, isOccupied: false },
  { slotNumber: 25, isOccupied: false },
  { slotNumber: 26, isOccupied: false },
  { slotNumber: 27, isOccupied: false },
  { slotNumber: 28, isOccupied: false },
  { slotNumber: 29, isOccupied: false },
  { slotNumber: 30, isOccupied: false },
  { slotNumber: 31, isOccupied: false },
  { slotNumber: 32, isOccupied: false },
  { slotNumber: 33, isOccupied: false },
  { slotNumber: 34, isOccupied: false },
  { slotNumber: 35, isOccupied: false },
  { slotNumber: 36, isOccupied: false },
  { slotNumber: 37, isOccupied: false },
  { slotNumber: 38, isOccupied: false },
  { slotNumber: 39, isOccupied: false },
  { slotNumber: 40, isOccupied: false },
  { slotNumber: 41, isOccupied: false },
  { slotNumber: 42, isOccupied: false },
  { slotNumber: 43, isOccupied: false },
  { slotNumber: 44, isOccupied: false },
  { slotNumber: 45, isOccupied: false },
  { slotNumber: 46, isOccupied: false },
  { slotNumber: 47, isOccupied: false },
  { slotNumber: 48, isOccupied: false },
  { slotNumber: 49, isOccupied: false },
  { slotNumber: 50, isOccupied: false },
];

ParkingSlot.insertMany(parkingSlots)
  .then(() => {
    console.log('Parking slots inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting parking slots:', error);
    mongoose.connection.close();
  });
