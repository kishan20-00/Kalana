import React, { useState } from "react";
import Chatbot from "react-simple-chatbot";
import "./home.css"; // Import CSS file for styling
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [chatbotOpened, setChatbotOpened] = useState(false); // Define initial state as `false`
  let navigate = useNavigate();

  const steps = [
    {
      id: "Great",
      message: "Hello!!! Welcome to our website!!!",
      trigger: "AskName",
    },
    {
      id: "AskName",
      message: "Please Enter Your Name!",
      trigger: "Name"
    },
    {
      id: "Name",
      user: true,
      trigger: "issues"
    },
    {
      id: "issues",
      message: "Hi {previousValue}, Please Select Your Issue!!!",
      trigger: "issueOptions"
    },
    {
      id: "issueOptions",
      options: [
        { value: "Location", label: "Location Problem", trigger: "Location" },
        { value: "OpeningTimes", label: "Opening Time Problem", trigger: "Opening" }
      ]
    },
    {
      id: "Location",
      message: "The location is Colombo -13",
      end: true
    },
    {
      id: "Opening",
      message: "The opening time will be 8 am to 10 pm",
      end: true
    }
  ];

  const toggleChatbot = () => {
    setChatbotOpened((prev) => !prev);
  };

  const logout = () => {
    navigate('/');
  };

  return (
    <div>
    <div className="header">
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand href="#home">SuperMall</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/viewitem">Items</Nav.Link>
            <Nav.Link href="/viewstore">Shops</Nav.Link>
            <Nav.Link href="/viewoffer">Offers</Nav.Link>
            <Nav.Link href="/qr">Parking Lot</Nav.Link>
            <Nav.Link href="/additem">Add Items</Nav.Link>
            <Nav.Link href="/addoffer">Add Offers</Nav.Link>
            <Nav.Link href="/addstore">Add Stores</Nav.Link>
            <Nav.Link href="/viewuser">Users</Nav.Link>
            <button className="logout" onClick={logout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      <div className="chatbot">
      {/* Check if chatbotOpened state is true before rendering Chatbot */}
      {chatbotOpened && <Chatbot steps={steps} />}
      <div className="home-page">
        {/* Add text inside button to verify if it's rendered */}
        <button onClick={toggleChatbot} className="chatbot-button"><img src="./c.jpg" alt="chatbot"/></button>
      </div>
    </div>
    </div>
  );
};
