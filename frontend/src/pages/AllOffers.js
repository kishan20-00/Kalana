import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import "./ViewOffers.css"; // Import CSS file for styling

export default function ViewOffers() {
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
        window.location.reload();
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

        axios.put(`http://localhost:8000/offer/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Offer Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Offers</h1>
            <Table striped bordered hover className="offers-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Offer Name</th>
                        <th>Store Name</th>
                        <th>Discount Percentage</th>
                        <th>Contact Number</th>
                        <th>Description</th>
                        <th>Period</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((val, key) => (
                        <tr key={key}>
                            <td>{val._id}</td>
                            <td>{val.OfferName}</td>
                            <td>{val.StoreName}</td>
                            <td>{val.DiscountPercentage}</td>
                            <td>{val.contactNumber}</td>
                            <td>{val.Description}</td>
                            <td>{val.Period}</td>
                            <td>
                                <Button variant="primary" onClick={() => updateOfferDetails(val)}>Update</Button>
                                <Button variant="danger" onClick={() => deleteOffers(val._id)}>Delete</Button>
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
                        <Form.Group controlId="OfferName">
                            <Form.Label>Offer Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.OfferName} onChange={(e) => setOfferName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="StoreName">
                            <Form.Label>Store Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.StoreName} onChange={(e) => setStoreName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="DiscountPercentage">
                            <Form.Label>Discount Percentage</Form.Label>
                            <Form.Control type="text" defaultValue={values.DiscountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" defaultValue={values.contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue={values.Description} onChange={(e) => setDescription(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="Period">
                            <Form.Label>Period</Form.Label>
                            <Form.Control type="text" defaultValue={values.Period} onChange={(e) => setPeriod(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

