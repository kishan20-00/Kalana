// Import the necessary components and functions
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import "./viewItems.css"; // Import the CSS file for styling

function ViewItems() {
    const [values, setValues] = useState([]);
    const [ItemName, setItemName] = useState("");
    const [StoreName, setStoreName] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");
    const [Stock, setStock] = useState("");

    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8000/item/").then((res) => {
                setItems(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getItems();
    }, []);

    const deleteItems = (id) => {
        axios.delete(`http://localhost:8000/item/delete/${id}`);
        alert("Item Details deleted.");
        window.location.reload();
    };

    const updateItemDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            ItemName: ItemName || values.ItemName,
            StoreName: StoreName || values.StoreName,
            Price: Price || values.Price,
            Description: Description || values.Description,
            Stock: Stock || values.Stock
        };

        axios.put(`http://localhost:8000/item/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Item Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Items</h1>
            <Table striped bordered hover responsive className="items-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Store Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((val, key) => (
                        <tr key={key}>
                            <td>{val._id}</td>
                            <td>{val.ItemName}</td>
                            <td>{val.StoreName}</td>
                            <td>{val.Price}</td>
                            <td>{val.Description}</td>
                            <td>{val.Stock}</td>
                            <td>
                                <Button variant="primary" onClick={() => updateItemDetails(val)}>Update</Button>
                                <Button onClick={() => deleteItems(val._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendData}>
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.ItemName} onChange={(e) => setItemName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="storeName">
                            <Form.Label>Store Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.StoreName} onChange={(e) => setStoreName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" defaultValue={values.Price} onChange={(e) => setPrice(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue={values.Description} onChange={(e) => setDescription(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control as="select" defaultValue={values.Stock} onChange={(e) => setStock(e.target.value)} required>
                                <option value="Available">Available</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Edit Details</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewItems;
