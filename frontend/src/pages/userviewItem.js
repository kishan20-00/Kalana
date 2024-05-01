import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from 'axios';
import "./viewItems.css"; // Import the CSS file for styling

function UserViewItems() {

    const [items, setItems] = useState([]);

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

    return (
        <div className="items-container">
            <h1>All Items</h1>
            <div className="items-cards">
                {items.map((val, key) => (
                    <Card key={key} className="item-card">
                        <Card.Img variant="top" src={val.ItemImage} alt={val.ItemName} />
                        <Card.Body>
                            <Card.Title>{val.ItemName}</Card.Title>
                            <Card.Text>
                                <p><strong>Store Name:</strong> {val.StoreName}</p>
                                <p><strong>Price:</strong> {val.Price}</p>
                                <p><strong>Description:</strong> {val.Description}</p>
                                <p><strong>Stock:</strong> {val.Stock}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UserViewItems;
