import React, { useState } from "react";
import "./home.css"; // Import CSS file for styling
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backgroundImage from './mall.jpg';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Home() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleListen = () => {
    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    handleBotResponse(transcript);
  };

  const handleBotResponse = (userMessage) => {
    let botMessage = '';
    // Convert userMessage to lowercase for case-insensitive matching
    const lowerCaseUserMessage = userMessage.toLowerCase();

    // Questions and their corresponding answers
    const questionAnswers = {
      'hello': "Hi! How can I assist you?",
      'i am fine': "Good to know! How can I assist you?",
      'what is your name': "I'm a chatbot developed by OpenAI.",
      'how are you': "I'm just a computer program, so I don't have feelings, but I'm here to assist you!",
      'what time is it': `I'm sorry, I can't provide real-time information.`,
      'where is the store':'it is on colombo 7',
      'what is the price':'price is 20 rs.',
    };

    // Check if the user's message matches any of the questions
    const answer = questionAnswers[lowerCaseUserMessage];

    if (answer) {
      botMessage = answer;
    } else {
      botMessage = "I'm sorry, I don't have an answer to that question.";
    }

    // Update the messages state with user and bot messages
    setMessages(prevMessages => [
      ...prevMessages,
      { text: userMessage, sender: 'user' },
      { text: botMessage, sender: 'bot' }
    ]);
  };

  const logout = () => {
    navigate('/');
  };

  const profile = () => {
    navigate('/profile');
  };

  return (
    <div 
    className="d-flex flex-column min-vh-100" 
    style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
        overflow: 'hidden', // Hide any overflowing content
    }}
>
    <div>
    <div className="header">
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="#home">Super Mall</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/userItem">Items</Nav.Link>
            <Nav.Link href="/userStore">Shops</Nav.Link>
            <Nav.Link href="/userOffer">Offers</Nav.Link>
            <Nav.Link href="/qr">Parking Lot</Nav.Link>
            <button className="logout" onClick={profile}>Profile</button>
            <button className="logout" onClick={logout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>

      </div>
      <div>
      <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
      <div className="chatbot-header">
        <button className="toggle-button" onClick={toggleChatbot}>
          {isOpen ? 'Close' : 'Open'} Chatbot
        </button>
      </div>
      <div className="chatbot-content">
        {isOpen && (
          <>
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.sender === 'user' ? 'You: ' : 'Bot: '}
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <button onClick={handleListen}>Start Listening</button>
              <button onClick={handleStop}>Stop Listening</button>
            </div>
          </>
        )}
      </div>
    </div>
      </div>
    </div>
  );
};
