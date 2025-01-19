import React, { useState, useEffect } from 'react';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';
import OnboardingForm from './OnboardingForm';
import './styles/App.css';

function App() {
  
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
<<<<<<< HEAD

  const togglePopup = () => {
    console.log("toggled")
    setShowPopup(!showPopup);
  }

=======
  const [isFirstChat, setIsFirstChat] = useState(false);
  const [popupContent, setPopupContent] = useState({
    name: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    emergencyContact: '',
    allergies: '',
    medicalConditions: '',
    currentMedications: ''
  });

  const togglePopup = () => {
    if (!showPopup) {
      const userData = JSON.parse(localStorage.getItem('userMedicalData')) || {};
      
      setPopupContent({
        name: userData.fullName || 'Not provided',
        dateOfBirth: userData.dateOfBirth || 'Not provided',
        height: userData.height ? `${userData.height} cm` : 'Not provided',
        weight: userData.weight ? `${userData.weight} kg` : 'Not provided',
        emergencyContact: userData.emergencyContact || 'Not provided',
        allergies: userData.allergies || 'None reported',
        medicalConditions: userData.medicalConditions || 'None reported',
        currentMedications: userData.currentMedications || 'None reported'
      });
    }
    setShowPopup(!showPopup);
  }

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

>>>>>>> amon_final2
  useEffect(() => {
    // Check if user has completed onboarding
    const userData = localStorage.getItem('userMedicalData');
    if (userData) {
      setIsFirstTime(false);
      // Load chat history
      const savedChats = localStorage.getItem('chats');
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChatHistory(parsedChats);
        if (parsedChats.length > 0) {
          setActiveChat(parsedChats[0].id);
          setMessages(parsedChats[0].messages || []);
        }
      } else {
        handleNewChat();
      }
    }
  }, []);

  // Save chats whenever they change
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Chat ${chatHistory.length + 1}`,
      messages: []
    };
    setChatHistory(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

  const handleChatSelect = (chatId) => {
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setActiveChat(chatId);
      setMessages(selectedChat.messages || []);
    }
  };

  const handleDeleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        handleChatSelect(remainingChats[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
    setChatHistory(prev => prev.map(chat => 
      chat.id === activeChat 
        ? { ...chat, messages: newMessages }
        : chat
    ));
  };

  const handleOnboardingComplete = () => {
    setIsFirstTime(false);
    handleNewChat();
  };

  return (
    <div className="app">
      {isFirstTime ? (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      ) : (
        <>
          <Sidebar 
            togglePopup={togglePopup} 
            showPopup={showPopup}
            chatHistory={chatHistory}
            activeChat={activeChat}
            onNewChat={handleNewChat}
            onChatSelect={handleChatSelect}
            onDeleteChat={handleDeleteChat}
          />
          <Chatbox 
            messages={messages}
            updateMessages={updateMessages}
            activeChat={activeChat}
          />
          {showPopup && (
            <div className="popup-card">
<<<<<<< HEAD
              <h2>Card Popup!</h2>
              <p>Data goes here...</p>
=======
              <h2>Medical ID</h2>
              <div className="popup-content">
                <div className="info-section basic-info">
                  <p><strong>Name:</strong> {popupContent.name}</p>
                  <p><strong>Date of Birth:</strong> {popupContent.dateOfBirth}</p>
                  <p><strong>Height:</strong> {popupContent.height}</p>
                  <p><strong>Weight:</strong> {popupContent.weight}</p>
                  <p><strong>Emergency Contact:</strong> {popupContent.emergencyContact}</p>
                </div>
                <div className="info-section">
                  <h3>Allergies</h3>
                  <p>{popupContent.allergies}</p>
                </div>
                <div className="info-section">
                  <h3>Medical Conditions</h3>
                  <p>{popupContent.medicalConditions}</p>
                </div>
                <div className="info-section">
                  <h3>Current Medications</h3>
                  <p>{popupContent.currentMedications}</p>
                </div>
              </div>
>>>>>>> amon_final2
              <button onClick={togglePopup}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;