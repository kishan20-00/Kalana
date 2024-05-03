import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./createStore.css";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {
    const [StoreName, setStoreName] = useState("");
    const [StoreImage, setStoreImage] = useState("");
    const [Email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [Location, setLocation] = useState("");
    const [Category, setCategory] = useState("");
    const [OpeningTime, setOpeningTime] = useState("");
    let navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        
        const newStore = {
            StoreName,
            StoreImage,
            Email,
            contactNumber,
            Location,
            Category,
            OpeningTime,
        }
  
        axios.post("http://localhost:8000/store/add", newStore)
            .then(() => {
                alert("Store Details were recorded.");
            })
            .catch((err) => {
                alert(err);
            });
    }

    const logout = () => {
        navigate('/');
      };
    
      const profile = () => {
        navigate('/profile');
      };

    return (
        <div>
            <div className="header">
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="#home">Super Mall</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/userItem">Items</Nav.Link>
            <Nav.Link href="/userStore">Shops</Nav.Link>
            <Nav.Link href="/userOffer">Offers</Nav.Link>
            <Nav.Link href="/qr">Parking Lot</Nav.Link>
            <button className="logout" onClick={profile}>Profile</button>
            <button className="logout" onClick={logout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
        <div className="container">
            <Form onSubmit={sendData}>
                <Form.Group controlId="name">
                    <Form.Label>Store Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        onChange={(e) => {
                            setStoreName(e.target.value);
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Image"
                        name="image"
                        onChange={(e) => {
                            setStoreImage(e.target.value);
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
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

                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="location"
                        placeholder="Enter Location"
                        name="location"
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="category"
                        placeholder="Enter Category"
                        name="category"
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="openingtime">
                    <Form.Label>Opening Time</Form.Label>
                    <Form.Control
                        type="openingtime"
                        placeholder="Enter Opening Time"
                        name="openingtime"
                        onChange={(e) => {
                            setOpeningTime(e.target.value);
                        }}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
        </div>
    );
}
