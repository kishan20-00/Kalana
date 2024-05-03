import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let scanner; // Define scanner instance

    // Initialize scanner when component mounts
    scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
    });

    // Render scanner
    scanner.render(successHandler, errorHandler);

    // Cleanup function to stop scanner when component unmounts
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [navigate]); // Reinitialize scanner when navigation changes

  const successHandler = (result) => {
    setScanResult(result);
    if (result === "Success") {
      const randomSlot = Math.floor(Math.random() * 50) + 1;
      // Redirect to parking page with the randomly picked slot number
      localStorage.setItem("randomSlot", randomSlot);
      navigate("/parking");
    }
  };

  const errorHandler = (error) => {
    console.warn("Error scanning:", error);
  };

  return (
    <div>
      {scanResult ? (
        <div>Success: {scanResult}</div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
