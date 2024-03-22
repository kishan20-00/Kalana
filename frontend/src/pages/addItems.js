import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./createItem.css"; // Import the CSS file for styling

export default function CreateItem() {
    const [itemName, setItemName] = useState("");
    const [storeName, setStoreName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("Available"); // Default value set to "Available"

    function sendData(e) {
        e.preventDefault();

        const newItem = {
            itemName,
            storeName,
            price,
            description,
            stock
        };

        axios.post("http://localhost:8000/item/add", newItem)
            .then(() => {
                alert("Store Item Details were recorded.");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
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
                    />
                </Form.Group>

                <Form.Group controlId="stock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        as="select"
                        value={stock}
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
    );
}
