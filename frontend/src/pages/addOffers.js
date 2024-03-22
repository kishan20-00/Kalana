import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./CreateOffer.css"; // Import CSS file for styling

export default function CreateOffer() {
  const [OfferName, setOfferName] = useState("");
  const [StoreName, setStoreName] = useState("");
  const [DiscountPercentage, setDiscountPercentage] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [Description, setDescription] = useState("");
  const [Period, setPeriod] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newOffer = {
      OfferName,
      StoreName,
      DiscountPercentage,
      contactNumber,
      Description,
      Period,
    };

    axios
      .post("http://localhost:8000/offer/add", newOffer)
      .then(() => {
        alert("Offer Details were recorded.");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="form-container">
      <Form onSubmit={sendData}>
        <div className="form-box">
          <Form.Group controlId="name">
            <Form.Label>Offer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={(e) => {
                setOfferName(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="storeName">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Store Name"
              name="storeName"
              onChange={(e) => {
                setStoreName(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="discountPercentage">
            <Form.Label>Discount Percentage</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Discount Percentage"
              name="discountPercentage"
              onChange={(e) => {
                setDiscountPercentage(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Contact Number"
              name="contactNumber"
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="period">
            <Form.Label>Period</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Period"
              name="period"
              onChange={(e) => {
                setPeriod(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}
