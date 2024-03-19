const storeOffers = require("../models/StoreOffers");

//add new Vehicle for system
exports.addNewOffer= async (req, res) => {
 
    //constant variables for the attributes
    const {
        OfferID,
        OfferName,
        StoreName,
        DiscountPercentage,
        contactNumber,
        Description,
        Period,
     } = req.body;
  
  
    storeOffers.findOne({OfferID: OfferID})
      .then((savedOffer) => {
          if(savedOffer) {
              return res.status(422).json({error:"Offer already exists with that no"})
          }
  
          const newOfferDetails = new storeOffers({
            OfferID,
        OfferName,
        StoreName,
        DiscountPercentage,
        contactNumber,
        Description,
        Period,
        })
    
        newOfferDetails.save().then(() => {
             res.json("Store Offers Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }

//delete existing one
exports.deleteStoreOffers = async (req, res) => {
    let offerID = req.params.id;
   
    await storeOffers.findByIdAndDelete(offerID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateStoreOffers= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {
        OfferName,
        StoreName,
        DiscountPercentage,
        contactNumber,
        Description,
        Period,
           } = req.body;
  
    const updateStoreOffers = {
        OfferName,
        StoreName,
        DiscountPercentage,
        contactNumber,
        Description,
        Period,
        }
  
  
    const update = await storeOffers.findByIdAndUpdate(id, updateStoreOffers).then(() => {
      res.status(200).send({status: "Store Offers updated"})
    }).catch((err) => {
        res.status(500).send({status: "Error with updating store Offers", error: err.message});
    })   
  }

//view 
exports.viewStoreOffers= async (req, res) => { 
 
    //calling  model
    storeOffers.find().then((storeOfferDetails) => {
      res.json(storeOfferDetails)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneStoreOffer = async (req, res) => {
    
    let storeOfferNumber = req.params.id;
    const storeoffer = await storeOffers.findById(storeOfferNumber).then((storeoffer) => {
        res.status(200).send({status: "fetched", storeoffer})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }

exports.viewOneStoreOfferDetail = async (req, res) => {
    const storeOffer = req.params.name; // Assuming the name is passed as a parameter

    try {
        const storeoffer = await storeOffers.findOne({ name: storeOffer });
        if (storeoffer) {
            res.status(200).json({ status: "success", storeoffer });
        } else {
            res.status(404).json({ status: "error", message: "Offer not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};