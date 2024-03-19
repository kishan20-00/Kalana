const router = require("express").Router();

const {addNewOffer,viewStoreOffers,viewOneStoreOffer, updateStoreOffers,deleteStoreOffers} = require ('../controllers/storeOffersController.js')

//add new Hotel 
router.post("/add", addNewOffer);

//view all Hotels
router.get("/", viewStoreOffers);

//update existing Hotel
 router.put("/update/:id",updateStoreOffers);

//delete existing one
 router.delete("/delete/:id",deleteStoreOffers);

//view one Hotel
router.get("/get/:id", viewOneStoreOffer);



module.exports = router;