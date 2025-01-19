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

    const updateCardInfo = async () => {
        const userData = JSON.parse(localStorage.getItem('userMedicalData')) || {};
        
        try {
            const response = await fetch('/update_card_info/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userData: userData,
                    chatHistory: chatHistory.find(chat => chat.id === activeChat)?.messages || []
                })
            });

            const data = await response.json();
            if (data.result && data.result !== 'No new medical information detected.') {
                // Parse the response and update localStorage
                const newInfo = parseGeminiResponse(data.result);
                updateUserMedicalData(newInfo);
            }
            togglePopup();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const parseGeminiResponse = (response) => {
        // First, check if NEW_CONDITIONS appears in the allergies section
        const hasConditionsInAllergies = response.includes('NEW_CONDITIONS:') && 
            response.indexOf('NEW_CONDITIONS:') < response.indexOf('NEW_ALLERGIES:');

        if (hasConditionsInAllergies) {
            // If conditions appear first, extract them carefully
            const conditions = response.match(/NEW_CONDITIONS:\s*(.+?)(?=NEW_ALLERGIES:|$)/s)?.[1]?.trim() || '';
            // Then get allergies after the NEW_ALLERGIES tag
            const allergies = response.match(/NEW_ALLERGIES:\s*(.+?)$/s)?.[1]?.trim() || '';
            return { allergies, conditions };
        } else {
            // Normal case - allergies first, then conditions
            const allergies = response.match(/NEW_ALLERGIES:\s*(.+?)(?=NEW_CONDITIONS:|$)/s)?.[1]?.trim() || '';
            const conditions = response.match(/NEW_CONDITIONS:\s*(.+?)$/s)?.[1]?.trim() || '';
            return { allergies, conditions };
        }
    };

    const updateUserMedicalData = (newInfo) => {
        const userData = JSON.parse(localStorage.getItem('userMedicalData')) || {};
        
        if (newInfo.allergies) {
            userData.allergies = userData.allergies 
                ? `${userData.allergies}, ${newInfo.allergies}`
                : newInfo.allergies;
        }
        
        if (newInfo.conditions) {
            userData.medicalConditions = userData.medicalConditions 
                ? `${userData.medicalConditions}, ${newInfo.conditions}`
                : newInfo.conditions;
        }
        
        localStorage.setItem('userMedicalData', JSON.stringify(userData));
    };

    const handleCardButtonClick = () => {
        updateCardInfo();
    };

    return (
        <div className="sidebar">
            <h1 className="app-title">{getUserFirstName()}'s
            Health Companion</h1>

            <button className="action-button" onClick={handleCardButtonClick}>
                {showPopup ? 'Close Medical ID' : 'Open Medical ID'}
            </button>
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