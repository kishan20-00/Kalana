const storeDetailDetails = require("../models/StoreDetails");

//add new Vehicle for system
exports.addNewStore= async (req, res) => {
 
    //constant variables for the attributes
    const {
      StoreName,
       Email,
       contactNumber,
       Location,
     Category,
     OpeningTime,
     } = req.body;
  
          const newStoreDetails = new storeDetailDetails({
            StoreName,
            Email,
            contactNumber,
            Location,
            Category,
            OpeningTime,
        })
    
        newStoreDetails.save().then(() => {
             res.json("Store Details Added")
    
        }).catch((err) => {
          
        })
      .catch((err) =>{
        
    })
    };

//delete existing one
exports.deleteStoreDetails = async (req, res) => {
    let storeID = req.params.id;
   
    await storeDetailDetails.findByIdAndDelete(storeID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateStoreDetails= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {
      StoreID,
      StoreName,
      Email,
      contactNumber,
      Location,
      Category,
      OpeningTime,
           } = req.body;
  
    const updateStoreDetails = {
      StoreID,
      StoreName,
      Email,
      contactNumber,
      Location,
      Category,
      OpeningTime,
        }
  
  
    const update = await storeDetailDetails.findByIdAndUpdate(id, updateStoreDetails).then(() => {
      res.status(200).send({status: "Store Details updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating store Details", error: err.message});
    })   
  }

//view 
exports.viewStoreDetails= async (req, res) => { 
 
    //calling  model
    storeDetailDetails.find().then((storeDetails) => {
      res.json(storeDetails)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneDetail = async (req, res) => {
    
    let storeDetailNumber = req.params.id;
    const storedetail = await storeDetailDetails.findById(storeDetailNumber).then((storedetail) => {
        res.status(200).send({status: "fetched", storedetail})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }

exports.viewOneStoreDetail = async (req, res) => {
    const storeName = req.params.name; // Assuming the name is passed as a parameter

    try {
        const storedetail = await storeDetailDetails.findOne({ name: storeName });
        if (storedetail) {
            res.status(200).json({ status: "success", storedetail });
        } else {
            res.status(404).json({ status: "error", message: "Store not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};