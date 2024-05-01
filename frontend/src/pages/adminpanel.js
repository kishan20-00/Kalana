import React from "react";
import { Link } from "react-router-dom";
import "./adminpanel.css";

function AdminPanel() {
    return (
        <div className="admin-panel-container">
            <h1>Admin Panel</h1>
            <div className="admin-panel-options">
                <div className="admin-panel-option">
                    <h2>Manage Users</h2>
                    <p>View, edit, or delete user accounts</p>
                    <Link to="/viewuser" className="admin-panel-link">Go to Users</Link>
                </div>
                <div className="admin-panel-option">
                    <h2>Manage Stores</h2>
                    <p>View, edit, or delete store information</p>
                    <Link to="/viewstore" className="admin-panel-link">Go to Stores</Link>
                </div>
                <div className="admin-panel-option">
                    <h2>Manage Items</h2>
                    <p>View, edit, or delete item details</p>
                    <Link to="/viewitem" className="admin-panel-link">Go to Items</Link>
                </div>
                <div className="admin-panel-option">
                    <h2>Manage Offers</h2>
                    <p>View, edit, or delete offer details</p>
                    <Link to="/viewoffer" className="admin-panel-link">Go to Offers</Link>
                </div>
                <div className="admin-panel-option">
                    <h2>Add Offers</h2>
                    <p>Add Offer details</p>
                    <Link to="/addoffer" className="admin-panel-link">Add Offer</Link>
                </div>
                <div className="admin-panel-option">
                    <h2>Add Stores</h2>
                    <p>Add store details</p>
                    <Link to="/addstore" className="admin-panel-link">Add Stores</Link>
                </div>
                <div className="admin-panel-option">
                    <h2>Add Items</h2>
                    <p>Add Item details</p>
                    <Link to="/additem" className="admin-panel-link">Add Items</Link>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
