import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./ParkingLot.css"; // Import CSS file for styling

function ParkingLot() {
  const [scanSuccess, setScanSuccess] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [parkingLot, setParkingLot] = useState(null);

  const handleScan = (data) => {
    if (data && data === "success") {
      // QR code scanned successfully with message "success"
      setScanSuccess(true);
      // Generate a random parking lot number
      const randomParkingLot = Math.floor(Math.random() * 100) + 1;
      setParkingLot(randomParkingLot);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleBoxClick = (box) => {
    // Toggle the selection status of the box
    if (selectedBoxes.includes(box)) {
      setSelectedBoxes(selectedBoxes.filter((selectedBox) => selectedBox !== box));
    } else {
      setSelectedBoxes([...selectedBoxes, box]);
    }
  };

  const handleOpenScanner = () => {
    setShowScanner(true);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <div className="container">
      <h1>Parking Lot</h1>
      <div className="grid-container">
        {Array.from({ length: 100 }, (_, index) => (
          <div
            key={index}
            className={`box ${selectedBoxes.includes(index) ? "selected" : ""}`}
            onClick={() => handleBoxClick(index)}
          >
            {index}
          </div>
        ))}
      </div>
      <button onClick={handleOpenScanner}>Open QR Scanner</button>
      {showScanner && (
        <div className="qr-scanner-popup">
          <QrScanner delay={300} onError={handleError} onScan={handleScan} />
          <button onClick={handleCloseScanner}>Close</button>
        </div>
      )}
      {scanSuccess && (
        <p>
          Success! Parking lot assigned: {parkingLot}
        </p>
      )}
    </div>
  );
}

export default ParkingLot;
