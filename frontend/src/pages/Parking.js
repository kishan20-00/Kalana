import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ParkingLot.css";
import { useNavigate } from "react-router-dom";

function ParkingLot() {
  let navigate = useNavigate();
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedSlotNum, setSelectedSlotNum] = useState(null);

  useEffect(() => {
    fetchParkingSlots();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      occupyRandomParkingSlot();
    }
  }, [isInitialized]); // Run when isInitialized state changes

  const fetchParkingSlots = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/parking-slots');
      console.log('Parking slots:', response.data);
      setParkingSlots(response.data);
      setIsInitialized(true); // Set isInitialized to true after parking slots are fetched
    } catch (error) {
      console.error('Error fetching parking slots:', error);
    }
  };

  const occupyRandomParkingSlot = async () => {
    try {
      const occupiedSlots = parkingSlots.filter(slot => slot.isOccupied);
      const unoccupiedSlots = parkingSlots.filter(slot => !slot.isOccupied);
  
      if (unoccupiedSlots.length === 0) {
        console.log('All parking slots are occupied.');
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * unoccupiedSlots.length);
      const randomSlot = unoccupiedSlots[randomIndex];
      await bookParkingSlot(randomSlot._id);
      setSelectedSlotNum(randomSlot.slotNumber);
    } catch (error) {
      console.error('Error occupying parking slot:', error);
    }
  };
  

  const bookParkingSlot = async (randomSlotId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/parking-slots/${randomSlotId}/occupy`);
      console.log('Parking slot booked:', response.data);
      setSelectedSlot(randomSlotId);
      fetchParkingSlots();
    } catch (error) {
      console.error('Error occupying parking slot:', error);
    }
  };

  const vacateParkingSlot = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/parking-slots/${selectedSlot}/vacate`);
      console.log('Parking slot vacated:', response.data);
      setSelectedSlot(null);
      fetchParkingSlots();
    } catch (error) {
      console.error('Error vacating parking slot:', error);
    }
  };

  const home = () => {
    navigate('/home');
  };

  return (
    <div className="App">
      <h1>Parking System</h1>
      <button onClick={home} className='back'>Back</button>
      {selectedSlot && <div>Selected Parking Slot: {selectedSlotNum}</div>}
      <button onClick={vacateParkingSlot} disabled={!selectedSlot}>Vacate</button>
      <div className="parking-slots">
        {parkingSlots.map((slot) => (
          <div
            key={slot._id}
            className={`parking-slot ${slot.isOccupied ? 'occupied' : 'available'}`}
          >
            Slot {slot.slotNumber}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingLot;
