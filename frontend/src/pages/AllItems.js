import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF for generating PDF reports
import "./viewItems.css"; // Import the CSS file for styling

function ViewItems() {
    const [values, setValues] = useState([]);
    const [ItemName, setItemName] = useState("");
    const [ItemImage, setItemImage] = useState("");
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
        window.location.reload();
    };

    const updateItemDetails = (val) => {
        setValues(val);
        handleShow();
    };

    const generatePDFReport = (itemData) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set properties of the PDF document
        doc.setProperties({
            title: 'Item Report',
            author: 'Your Company',
        });

        // Set up the header of the PDF
        doc.setFontSize(18);
        doc.text('Item Report', 105, 10, { align: 'center' });

        // Generate the content of the PDF
        let content = '';
        content += `Item Name: ${itemData.ItemName}\n`;
        content += `Store Name: ${itemData.StoreName}\n`;
        content += `Price: ${itemData.Price}\n`;
        content += `Description: ${itemData.Description}\n`;
        content += `Stock: ${itemData.Stock}\n`;

        // Add the content to the PDF
        doc.setFontSize(12);
        doc.text(content, 10, 20);

        // Save the PDF
        doc.save('item_report.pdf');
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            ItemName: ItemName || values.ItemName,
            ItemImage: ItemImage || values.ItemImage,
            StoreName: StoreName || values.StoreName,
            Price: Price || values.Price,
            Description: Description || values.Description,
            Stock: Stock || values.Stock
        };

        axios.put(`http://localhost:8000/item/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Item Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div className="items-container">
            <h1>All Items</h1>
            <div className="items-cards">
                {items.map((val, key) => (
                    <Card key={key} className="item-card">
                        <div className="card-image">
                            <Card.Img variant="top" src={val.ItemImage} alt={val.ItemName} />
                        </div>
                        <Card.Body>
                            <Card.Title>{val.ItemName}</Card.Title>
                            <Card.Text>
                                <p><strong>Store Name:</strong> {val.StoreName}</p>
                                <p><strong>Price:</strong> {val.Price}</p>
                                <p><strong>Description:</strong> {val.Description}</p>
                                <p><strong>Stock:</strong> {val.Stock}</p>
                            </Card.Text>
                            <div className="card-buttons">
                                <Button variant="primary" onClick={() => updateItemDetails(val)} className="update-button">Update</Button>
                                <Button onClick={() => deleteItems(val._id)} className="delete-button">Delete</Button>
                                <Button onClick={() => generatePDFReport(val)} className="report-button">Download Report</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendData}>
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.ItemName} onChange={(e) => setItemName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="itemImage">
                            <Form.Label>Item Image</Form.Label>
                            <Form.Control type="text" defaultValue={values.ItemImage} onChange={(e) => setItemImage(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="storeName">
                            <Form.Label>Store Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.StoreName} onChange={(e) => setStoreName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" defaultValue={values.Price} onChange={(e) => setPrice(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue={values.Description} onChange={(e) => setDescription(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control as="select" defaultValue={values.Stock} onChange={(e) => setStock(e.target.value)} required>
                                <option value="Available">Available</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Edit Details</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewItems;
