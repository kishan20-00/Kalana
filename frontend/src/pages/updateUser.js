import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';

function ViewUsers() {
    const [values, setValues] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getUsers() {
            axios.get("http://localhost:8000/user/").then((res) => {
                setUsers(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getUsers();
    }, []);

    const deleteUsers = (id) => {
        axios.delete(`http://localhost:8000/user/delete/${id}`);
        alert("User Profile deleted.");
    };

    const updateUserDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            name: name || values.name,
            email: email || values.email,
            contactNumber: contactNumber || values.contactNumber,
            password: password || values.password
        };

        axios.put(`http://localhost:8000/user/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("User Details Updated");
                handleClose();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Payments</h1>
            {users.map((val, key) => (
                <div key={key} className="users">
                    <ListGroup key={key} horizontal className="my-2">
                        <ListGroup.Item>{val._id}</ListGroup.Item>
                        <ListGroup.Item>{val.name}</ListGroup.Item>
                        <ListGroup.Item>{val.email}</ListGroup.Item>
                        <ListGroup.Item>{val.contactNumber}</ListGroup.Item>
                        <ListGroup.Item>{val.password}</ListGroup.Item>
                    </ListGroup>

                    <Button variant="primary" onClick={() => updateUserDetails(val)} className="uppay">Update</Button>
                    <Button className="delpay" onClick={() => deleteUsers(val._id)}>Delete</Button>

                    <Modal show={show} onHide={handleClose} className="getfunc">
                        <Modal.Header closeButton>
                            <Modal.Title>Update Details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form onSubmit={sendData}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" defaultValue={values.name} onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" defaultValue={values.email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="contactNumber">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" defaultValue={values.contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" defaultValue={values.password} onChange={(e) => setPassword(e.target.value)} required />
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

export default ViewUsers;
