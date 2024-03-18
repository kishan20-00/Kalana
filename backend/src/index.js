const express = require("express");
const cors = require("cors");
const  mongoose = require('mongoose');
require("dotenv").config();

// const userRouter = require("./routes/User-routes");

const app = express();
// Enable all CORS requests
app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/guide', require('./routes/guideRoutes'));
app.use('/api/partner', require('./routes/partnerRoutes'));
//app.use('/api/vehicle', require('./routes/vehicleRouter'));

//product router
const productRouter = require("./routes/productRoutes.js");
app.use("/product", productRouter);

//event router
const eventRouter = require("./routes/eventRoutes.js");
app.use("/event", eventRouter);

//location router
const locationRouter = require("./routes/locationRoutes.js");
app.use("/location", locationRouter);

//vehicle router
const vehicleRouter = require("./routes/vehicleRouter.js");
app.use("/vehicle", vehicleRouter);

//promo code router
const promoCodeRouter = require("./routes/promoCodeRouter.js");
app.use("/promo", promoCodeRouter);

//Package  router
const packageRouter = require("./routes/packageRoutes.js");
app.use("/package", packageRouter);

//Hotel router
const hotelRouter = require("./routes/hotelRoutes.js");
app.use("/hotel", hotelRouter);

//Rates Router
const rateRouter = require("./routes/rateRoutes.js");
app.use("/rate", rateRouter);

//RealTime Router
const realTimeRouter = require("./routes/realTimeRoutes.js");
app.use("/realTime", realTimeRouter);

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