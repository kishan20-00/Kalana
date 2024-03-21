import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function CreateOffer(){
    const [OfferID, setOfferID] = useState("");
    const [OfferName, setOfferName] = useState("");
    const [StoreName, setStoreName] = useState("");
    const [DiscountPercentage, setDiscountPercentage] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [Description, setDescription] = useState("");
    const [Period, setPeriod] = useState("");

    function sendData(e) {
        e.preventDefault();
        
        const newOffer = {
            OfferID,
        OfferName,
        StoreName,
        DiscountPercentage,
        contactNumber,
        Description,
        Period,
        }
  
        
        axios.post("http://localhost:8000/offer/add", newOffer).then(()=>{
          alert("Offer Details were recorded.");
        }).catch((err)=>{
            alert(err)
        })
  
      }


  return (
    <Form onSubmit={sendData}>
      <Form.Group controlId="offerID">
        <Form.Label>Offer ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Offer ID"
          name="offerID"
          onChange={(e)=>{
            setOfferID(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="name">
        <Form.Label>Offer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={(e)=>{
            setOfferName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="name">
        <Form.Label>Store Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter Name"
          name="name"
          onChange={(e)=>{
            setStoreName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="Price">
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Contact Number"
          name="contactNumber"
          onChange={(e)=>{
            setDiscountPercentage(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="location">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
          type="location"
          placeholder="Enter Location"
          name="location"
          onChange={(e)=>{
            setContactNumber(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="location">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="location"
          placeholder="Enter Location"
          name="location"
          onChange={(e)=>{
            setDescription(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="Category">
        <Form.Label>Period</Form.Label>
        <Form.Control
          type="category"
          placeholder="Enter Category"
          name="category"
          onChange={(e)=>{
            setPeriod(e.target.value);
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

