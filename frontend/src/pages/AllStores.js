import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import "./viewStores.css";

function ViewStores() {
    const [values, setValues] = useState([]);
    const [StoreName, setStoreName] = useState("");
    const [Email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [Location, setLocation] = useState("");
    const [Category, setCategory] = useState("");
    const [OpeningTime, setOpeningTime] = useState("");
    const [stores, setStores] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getStores() {
            axios.get("http://localhost:8000/store/").then((res) => {
                setStores(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getStores();
    }, []);

    const deleteStores = (id) => {
        axios.delete(`http://localhost:8000/store/delete/${id}`);
        alert("Store Details deleted.");
        window.location.reload();
    };

    const updateStoreDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            StoreName: StoreName || values.StoreName,
            Email: Email || values.Email,
            contactNumber: contactNumber || values.contactNumber,
            Location: Location || values.Location,
            Category: Category || values.Category,
            OpeningTime: OpeningTime || values.OpeningTime
        };

        axios.put(`http://localhost:8000/store/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Store Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Stores</h1>
            <table className="store-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Store Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Opening Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((val, key) => (
                        <tr key={key}>
                            <td>{val._id}</td>
                            <td>{val.StoreName}</td>
                            <td>{val.Email}</td>
                            <td>{val.contactNumber}</td>
                            <td>{val.Location}</td>
                            <td>{val.Category}</td>
                            <td>{val.OpeningTime}</td>
                            <td>
                                <Button variant="primary" onClick={() => updateStoreDetails(val)} className="uppay">Update</Button>
                                <Button className="delpay" onClick={() => deleteStores(values._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose} className="getfunc">
                <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendData}>
                        <Form.Group controlId="name">
                            <Form.Label>Store Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.StoreName} onChange={(e) => setStoreName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" defaultValue={values.Email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" defaultValue={values.contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" defaultValue={values.Location} onChange={(e) => setLocation(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" defaultValue={values.Category} onChange={(e) => setCategory(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="openingtime">
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control type="text" defaultValue={values.OpeningTime} onChange={(e) => setOpeningTime(e.target.value)} required />
                        </Form.Group>
                        <Button className="finalpay" type="submit">Edit details</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewStores;
