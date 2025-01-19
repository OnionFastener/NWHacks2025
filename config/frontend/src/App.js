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
        </>
      )}
    </div>
  );
}

export default App;