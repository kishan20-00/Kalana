import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./profile.css";
import jsPDF from 'jspdf';

function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const downloadPdf = () => {
        if (userData) {
            const doc = new jsPDF();
            doc.text(`Name: ${userData.user.name}`, 10, 10);
            doc.text(`Email: ${userData.user.email}`, 10, 20);
            doc.text(`Contact Number: ${userData.user.contactNumber}`, 10, 30);
            doc.text(`Password: ${userData.user.password}`, 10, 40);
            doc.save("user_details.pdf");
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {userData && (
                <>
                    <Card className="profile-card">
                        <Card.Body>
                            <Card.Title>{userData.user.name}</Card.Title>
                            <Card.Text>Email: {userData.user.email}</Card.Text>
                            <Card.Text>Contact Number: {userData.user.contactNumber}</Card.Text>
                            <Card.Text>Password: {userData.user.password}</Card.Text>
                            <Button variant="primary" onClick={downloadPdf}>Download PDF</Button>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    );
}

export default Profile;
