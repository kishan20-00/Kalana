const storeItemDetails = require("../models/StoreItems");

//add new Vehicle for system
exports.addNewItem= async (req, res) => {
 
    //constant variables for the attributes
    const {
      ItemName,
      StoreName,
      Price,
      Description,
      Stock,
     } = req.body;
  
          const newItemDetails = new storeItemDetails({
      ItemName,
      StoreName,
      Price,
      Description,
      Stock,
        })
    
        newItemDetails.save().then(() => {
             res.json("Store Items Added")
    
        }).catch((err) => {
          
        })
      
    .catch((err) =>{
        
    })
    };

//delete existing one
exports.deleteStoreItems = async (req, res) => {
    let itemID = req.params.id;
   
    await storeItemDetails.findByIdAndDelete(itemID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateStoreItems= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {
      ItemName,
      StoreName,
      Price,
      Description,
      Stock,
           } = req.body;
  
    const updateStoreItems = {
      ItemName,
      StoreName,
      Price,
      Description,
      Stock,
        }
  
  
    const update = await storeItemDetails.findByIdAndUpdate(id, updateStoreItems).then(() => {
      res.status(200).send({status: "Store Items updated"})
    }).catch((err) => {
        res.status(500).send({status: "Error with updating store Items", error: err.message});
    })   
  }

//view 
exports.viewStoreItems= async (req, res) => { 
 
    //calling  model
    storeItemDetails.find().then((storeItems) => {
      res.json(storeItems)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneStoreItem = async (req, res) => {
    
    let storeItemNumber = req.params.id;
    const storeitem = await storeItemDetails.findById(storeItemNumber).then((storeitem) => {
        res.status(200).send({status: "fetched", storeitem})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }

exports.viewOneStoreItemDetail = async (req, res) => {
    const storeItemName = req.params.name; // Assuming the name is passed as a parameter

    try {
        const storeitem = await storeItemDetails.findOne({ name: storeItemName });
        if (storeitem) {
            res.status(200).json({ status: "success", storeitem });
        } else {
            res.status(404).json({ status: "error", message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};