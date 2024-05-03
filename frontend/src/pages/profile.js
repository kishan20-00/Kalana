import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "./profile.css";
import jsPDF from 'jspdf';
import axios from 'axios';

function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({});
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Fetch user details when the component mounts
        const getUserDetails = async () => {
            const user = JSON.parse(localStorage.getItem('userData'));
            setDetails(user);
            const id = user.user._id;
            try {
                const res = await axios.get(`http://localhost:8000/user/get/${id}`);
                setDetails(res.data.user);
            } catch (err) {
                alert(err.message);
            }
        };
        getUserDetails();
    }, []);


    const downloadProfileAsPDF = () => {
        const pdf = new jsPDF();
    
        // Add heading
        pdf.setFontSize(24); // Increased font size for the heading
        pdf.text('Profile Details', 10, 10);
    
        // Add user details to PDF
        const profileDetails = `
            User Name: ${details.name}
            Email: ${details.email}
            Contact Number: ${details.contactNumber}
            Password: ${details.password}
        `;
        pdf.setFontSize(12); // Reset font size for details
        pdf.text(profileDetails, 10, 20);
    
        pdf.save("profile-details.pdf");
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
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
                <>
                    <Card className="profile-card" >
                        <Card.Body>
                        <Card.Title>User Name: {details.name}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {details.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Contact Number:</strong> {details.contactNumber}
                        </Card.Text>
                        <Card.Text>
                            <strong>Password:</strong> {details.password}
                        </Card.Text>
                        <Button variant="primary" onClick={() => updateUserDetails(details)}>Update</Button>
                        <Button variant="secondary" onClick={downloadProfileAsPDF}>Download PDF</Button>
                    </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} className="getfunc">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={sendData}>
                            <Form.Group controlId="name">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" defaultValue={values.name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={values.email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="contactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" defaultValue={values.contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" defaultValue={values.password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Button className="finalpay" type="submit">Edit details</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                </>
        </div>
    );
}

export default Profile;
