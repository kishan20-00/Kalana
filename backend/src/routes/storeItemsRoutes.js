const router = require("express").Router();

const {addNewItem,viewStoreItems,viewOneStoreItem, updateStoreItems,deleteStoreItems} = require ('../controllers/storeItemsController.js')

//add new Hotel 
router.post("/add", addNewItem);

//view all Hotels
router.get("/", viewStoreItems);

//update existing Hotel
 router.put("/update/:id",updateStoreItems);

//delete existing one
 router.delete("/delete/:id",deleteStoreItems);

//view one Hotel
router.get("/get/:id", viewOneStoreItem);



module.exports = router;