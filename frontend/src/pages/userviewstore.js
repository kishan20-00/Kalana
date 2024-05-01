import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from 'axios';
import "./viewStores.css";

function UserViewStores() {
    const [stores, setStores] = useState([]);

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


    return (
        <div className="store-container">
            <h1>All Stores</h1>
            <div className="store-cards">
                {stores.map((val, key) => (
                    <Card key={key} className="store-card">
                        <Card.Img variant="top" src={val.StoreImage} alt={val.StoreName} />
                        <Card.Body>
                            <Card.Title>{val.StoreName}</Card.Title>
                            <Card.Text>
                                <p><strong>Email:</strong> {val.Email}</p>
                                <p><strong>Contact Number:</strong> {val.contactNumber}</p>
                                <p><strong>Location:</strong> {val.Location}</p>
                                <p><strong>Category:</strong> {val.Category}</p>
                                <p><strong>Opening Time:</strong> {val.OpeningTime}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UserViewStores;
