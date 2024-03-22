import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user/log", { name, password });
            console.log(response.data); 
            alert("Logged in Successfully!!!");
            navigate('/home');
        } catch (err) {
            setError("Invalid username or password"); // Set error message for invalid login attempt
            console.error(err); // Log any error to the console for debugging
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="subButton">
                        Login
                    </Button>

                    <div className="signup-link">
                    <p>Don't have an account? <Link to="/sign">Sign up</Link></p>
                </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
