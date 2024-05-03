import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./createItem.css"; // Import the CSS file for styling
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateItem() {
    const [ItemName, setItemName] = useState("");
    const [ItemImage, setItemImage] = useState("");
    const [StoreName, setStoreName] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");
    const [Stock, setStock] = useState("Available"); // Default value set to "Available"
    let navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();

        const newItem = {
            ItemName,
            ItemImage,
            StoreName,
            Price,
            Description,
            Stock
        };

        axios.post("http://localhost:8000/item/add", newItem)
            .then(() => {
                alert("Store Item Details were recorded.");
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
        <div className="create-item-container">
            <Form onSubmit={sendData}>
                <Form.Group controlId="itemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Item Name"
                        name="itemName"
                        onChange={(e) => {
                            setItemName(e.target.value);
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="itemImage">
                    <Form.Label>Item Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Item Image"
                        name="itemImage"
                        onChange={(e) => {
                            setItemImage(e.target.value);
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

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Price"
                        name="price"
                        onChange={(e) => {
                            setPrice(e.target.value);
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

                <Form.Group controlId="stock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        as="select"
                        value={Stock}
                        onChange={(e) => {
                            setStock(e.target.value);
                        }}
                    >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="addbutton">
                    Add
                </Button>
            </Form>
        </div>
        </div>
    );
}
