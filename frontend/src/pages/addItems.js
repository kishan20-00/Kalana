import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function CreateItem(){
    const [ItemID, setItemID] = useState("");
    const [ItemName, setItemName] = useState("");
    const [StoreName, setStoreName] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");
    const [Stock, setStock] = useState("");

    function sendData(e) {
        e.preventDefault();
        
        const newStore = {
            ItemID,
      ItemName,
      StoreName,
      Price,
      Description,
      Stock,
        }
  
        
        axios.post("http://localhost:8000/item/add", newStore).then(()=>{
          alert("Store Item Details were recorded.");
        }).catch((err)=>{
            alert(err)
        })
  
      }


  return (
    <Form onSubmit={sendData}>
      <Form.Group controlId="userID">
        <Form.Label>Item ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter User ID"
          name="userID"
          onChange={(e)=>{
            setItemID(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="name">
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={(e)=>{
            setItemName(e.target.value);
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
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Contact Number"
          name="contactNumber"
          onChange={(e)=>{
            setPrice(e.target.value);
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
        <Form.Label>Stocks</Form.Label>
        <Form.Control
          type="category"
          placeholder="Enter Category"
          name="category"
          onChange={(e)=>{
            setStock(e.target.value);
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

