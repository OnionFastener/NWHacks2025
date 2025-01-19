import React, { useState, useEffect, useRef } from 'react';
import './styles/Chatbox.css';

const Chatbox = ({ messages, updateMessages, activeChat }) => {
    const [inputValue, setInputValue] = useState("");
    const chatAreaRef = useRef(null);
<<<<<<< HEAD
=======
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const getUserFirstName = () => {
        const userData = JSON.parse(localStorage.getItem('userMedicalData')) || {};
        const fullName = userData.fullName || '';
        return fullName.split(' ')[0];
    };
>>>>>>> amon_final2

    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyDown = (e) => {
        // Check for Command+Enter (Mac) or Control+Enter (Windows)
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!inputValue.trim() || !activeChat) return;

<<<<<<< HEAD
=======
        if (!hasSubmitted) {
            setHasSubmitted(true);
        }

>>>>>>> amon_final2
        // Add user message immediately
        const updatedMessages = [...messages, { type: 'user', text: inputValue }];
        updateMessages(updatedMessages);

        try {
            const response = await fetch('/get_response/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ text: inputValue })
            });

            const data = await response.json();
            setInputValue(''); // Clear input after sending

            if (data.result) {
                // Add AI response
                updateMessages([...updatedMessages, { type: 'ai', text: data.result }]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to format text with newlines
    const formatText = (text) => {
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i !== text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="chatbox" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            overflow: 'hidden'
        }}>
            <div style={{
                width: '1100px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                overflow: 'hidden'
            }}>
                <div
                    ref={chatAreaRef}
                    className="chat-area"
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '15px'
                    }}
                >
<<<<<<< HEAD
=======
                    {!hasSubmitted && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                color: 'black',
                                fontSize: '24px'
                            }}
                        >
                            Hey {getUserFirstName()}, I'm your personal MediCompanion.
                            <br />
                            <span style={{ display: 'block', marginTop: '15px', color: 'black' }}>Type something to get started!
                            </span>
                        </div>
                    )}

>>>>>>> amon_final2
                    <div style={{
                        marginTop: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                                    marginBottom: '10px'
                                }}
                            >
                                <div
                                    className={`message ${message.type}-message`}
                                    style={{
                                        display: 'inline-block',
                                        maxWidth: '70%',
                                        padding: '10px 15px',
                                        borderRadius: '10px',
                                        backgroundColor: message.type === 'user' ? '#0ea5e9' : '#e9ecef',
                                        color: message.type === 'user' ? 'white' : 'black',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        width: 'fit-content',
                                        minWidth: '40px',
                                        boxSizing: 'border-box'
                                    }}
                                >
<<<<<<< HEAD
                                    {formatText(message.text)}
=======
                                    {message.type === 'ai' ? (
                                        <div className="model-response">
                                            <img
                                                src={require('./images/robot.png')}
                                                alt="AI Assistant"
                                                className="robot-icon"
                                            />
                                            <div className="response-content">
                                                {formatText(message.text)}
                                            </div>
                                        </div>
                                    ) : (
                                        formatText(message.text)
                                    )}
>>>>>>> amon_final2
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    backgroundColor: 'white',
                    zIndex: 1
                }}>
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="How can MediCompanion help?"
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            minHeight: '50px',
                            maxHeight: '200px',
                            resize: 'none',
                            overflow: 'auto',
                            lineHeight: '1.5',
                            fontSize: '14px'
                        }}
                        rows={Math.min(5, inputValue.split('\n').length || 1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;