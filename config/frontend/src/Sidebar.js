import React from 'react';
import './styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1 className="app-title">John's Health Companion</h1>
            <button className="action-button">Medical History</button>
            <button className="action-button">Book Appointment</button>
            <button className="new-chat-button">+ New Chat</button>
            <div className="chat-history">
                {/* Chat history will be added here when we implement persistence */}
            </div>
        </div>
    );
};

export default Sidebar;