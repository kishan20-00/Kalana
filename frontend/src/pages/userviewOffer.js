import React, { useState, useEffect } from "react";
import { Table} from "react-bootstrap";
import axios from 'axios';
import "./ViewOffers.css"; // Import CSS file for styling

export default function UserViewOffers() {
    const [offers, setOffers] = useState([]);

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

    return (
        <div>
            <h1>All Offers</h1>
            <Table striped bordered hover className="offers-table">
                <thead>
                    <tr>
                        <th>Offer Name</th>
                        <th>Store Name</th>
                        <th>Discount Percentage</th>
                        <th>Contact Number</th>
                        <th>Description</th>
                        <th>Period</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((val, key) => (
                        <tr key={key}>
                            <td>{val.OfferName}</td>
                            <td>{val.StoreName}</td>
                            <td>{val.DiscountPercentage}</td>
                            <td>{val.contactNumber}</td>
                            <td>{val.Description}</td>
                            <td>{val.Period}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

