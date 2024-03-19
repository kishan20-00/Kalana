const router = require("express").Router();

const {addNewStore,viewStoreDetails,viewOneDetail, updateStoreDetails,deleteStoreDetails, viewOneStoreDetail} = require ('../controllers/storeDetailsController.js')

//add new Hotel 
router.post("/add", addNewStore);

//view all Hotels
router.get("/", viewStoreDetails);

//update existing Hotel
 router.put("/update/:id",updateStoreDetails);

//delete existing one
 router.delete("/delete/:id",deleteStoreDetails);

//view one Hotel
router.get("/get/:id", viewOneDetail);



module.exports = router;