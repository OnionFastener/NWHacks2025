import React from 'react';
import './styles/Sidebar.css';

const Sidebar = ({ togglePopup, showPopup, chatHistory, activeChat, onNewChat, onChatSelect, onDeleteChat }) => {
    const clearAllData = () => {
        if (window.confirm('This will clear all your data and restart the app. Are you sure?')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const getUserFirstName = () => {
        const userData = JSON.parse(localStorage.getItem('userMedicalData')) || {};
        const fullName = userData.fullName || '';
        return fullName.split(' ')[0];
    };

    return (
        <div className="sidebar">
            <h1 className="app-title">{getUserFirstName()}'s MediCompanion</h1>

            <button className="action-button" onClick={togglePopup}>{showPopup ? 'Close Card' : 'Open Card'}</button>
            <button 
                className="action-button" 
                onClick={clearAllData}
                style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
            >
                Reset All Data
            </button>
            <button className="new-chat-button" onClick={onNewChat}>+ New Chat</button>
            <div className="chat-history">
                {chatHistory.map((chat) => (
                    <div 
                        key={chat.id}
                        className={`chat-history-item ${chat.id === activeChat ? 'active' : ''}`}
                        onClick={() => onChatSelect(chat.id)}
                    >
                        <span className="chat-title">{chat.title}</span>
                        <button 
                            className="delete-chat-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteChat(chat.id);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;