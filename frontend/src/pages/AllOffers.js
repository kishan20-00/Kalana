import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';

function ViewOffers() {
    const [values, setValues] = useState([]);

    const [OfferName, setOfferName] = useState("");
    const [StoreName, setStoreName] = useState("");
    const [DiscountPercentage, setDiscountPercentage] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [Description, setDescription] = useState("");
    const [Period, setPeriod] = useState("");

    const [offers, setOffers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getOffers() {
            axios.get("http://localhost:8000/offer/").then((res) => {
                setOffers(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getOffers();
    }, []);

    const deleteOffers = (id) => {
        axios.delete(`http://localhost:8000/offer/delete/${id}`);
        alert("Offer Details deleted.");
    };

    const updateOfferDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            OfferName: OfferName || values.OfferName,
            StoreName: StoreName || values.StoreName,
            DiscountPercentage: DiscountPercentage || values.DiscountPercentage,
            contactNumber: contactNumber || values.contactNumber,
            Description: Description || values.Description,
            Period: Period || values.Period
        };

        axios.put(`http://localhost:8000/item/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Offer Details Updated");
                handleClose();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Offers</h1>
            {offers.map((val, key) => (
                <div key={key} className="users">
                    <ListGroup key={key} horizontal className="my-2">
                        <ListGroup.Item>{val._id}</ListGroup.Item>
                        <ListGroup.Item>{val.OfferName}</ListGroup.Item>
                        <ListGroup.Item>{val.StoreName}</ListGroup.Item>
                        <ListGroup.Item>{val.DiscountPercentage}</ListGroup.Item>
                        <ListGroup.Item>{val.contactNumber}</ListGroup.Item>
                        <ListGroup.Item>{val.Description}</ListGroup.Item>
                        <ListGroup.Item>{val.Period}</ListGroup.Item>
                    </ListGroup>

                    <Button variant="primary" onClick={() => updateOfferDetails(val)} className="uppay">Update</Button>
                    <Button className="delpay" onClick={() => deleteOffers(val._id)}>Delete</Button>

                    <Modal show={show} onHide={handleClose} className="getfunc">
                        <Modal.Header closeButton>
                            <Modal.Title>Update Details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form onSubmit={sendData}>
                                <Form.Group controlId="name">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control type="text" defaultValue={values.ItemName} onChange={(e) => setOfferName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Store Name</Form.Label>
                                    <Form.Control type="text" defaultValue={values.StoreName} onChange={(e) => setStoreName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="contactNumber">
                                    <Form.Label>Discount Percentage</Form.Label>
                                    <Form.Control type="text" defaultValue={values.Price} onChange={(e) => setDiscountPercentage(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" defaultValue={values.Description} onChange={(e) => setContactNumber(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" defaultValue={values.Stock} onChange={(e) => setDescription(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Period</Form.Label>
                                    <Form.Control type="text" defaultValue={values.Stock} onChange={(e) => setPeriod(e.target.value)} required />
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

export default ViewOffers;
