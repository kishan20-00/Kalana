import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';

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
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Payments</h1>
            {items.map((val, key) => (
                <div key={key} className="users">
                    <ListGroup key={key} horizontal className="my-2">
                        <ListGroup.Item>{val._id}</ListGroup.Item>
                        <ListGroup.Item>{val.ItemName}</ListGroup.Item>
                        <ListGroup.Item>{val.StoreName}</ListGroup.Item>
                        <ListGroup.Item>{val.Price}</ListGroup.Item>
                        <ListGroup.Item>{val.Description}</ListGroup.Item>
                        <ListGroup.Item>{val.Stock}</ListGroup.Item>
                    </ListGroup>

                    <Button variant="primary" onClick={() => updateItemDetails(val)} className="uppay">Update</Button>
                    <Button className="delpay" onClick={() => deleteItems(val._id)}>Delete</Button>

                    <Modal show={show} onHide={handleClose} className="getfunc">
                        <Modal.Header closeButton>
                            <Modal.Title>Update Details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form onSubmit={sendData}>
                                <Form.Group controlId="name">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control type="text" defaultValue={values.ItemName} onChange={(e) => setItemName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Store Name</Form.Label>
                                    <Form.Control type="text" defaultValue={values.StoreName} onChange={(e) => setStoreName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="contactNumber">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" defaultValue={values.Price} onChange={(e) => setPrice(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" defaultValue={values.Description} onChange={(e) => setDescription(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="text" defaultValue={values.Stock} onChange={(e) => setStock(e.target.value)} required />
                                </Form.Group>

                                <Button className="finalpay" type="submit">Edit details</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default ViewItems;
