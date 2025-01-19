import React, { useState } from 'react';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';
import './styles/App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    console.log("toggled")
    setShowPopup(!showPopup);
  }

  return (
    <div className="app">
      <Sidebar togglePopup={togglePopup} showPopup={showPopup} />
      <Chatbox />
      {showPopup && (
        <div className="popup-card">
          <h2>Card Popup!</h2>
          <p>Data goes here...</p>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;