import React, { useState, useEffect, useRef } from 'react';

const Chatbox = () => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    
    // Add ref for chat area
    const chatAreaRef = useRef(null);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async () => {
        if (!inputValue.trim()) return;

        // Add user message immediately
        setMessages(prevMessages => [...prevMessages, 
            { type: 'user', text: inputValue }
        ]);
        
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
                setMessages(prevMessages => [...prevMessages, 
                    { type: 'ai', text: data.result }
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (  
        <div className="chatbox" style={{
            height: '95vh',  // Slightly reduced from 100vh
            display: 'flex'
        }}>
            <div style={{ 
                width: '1100px', 
                height: '100%',
                display: 'flex', 
                flexDirection: 'column',
                padding: '15px',
                overflow: 'hidden'  // Prevent container scrolling
            }}>
                {/* Messages area - adjusted height */}
                <div 
                    ref={chatAreaRef}  // Add ref here
                    className="chat-area" 
                    style={{
                        flex: 1,  // Take remaining space
                        overflowY: 'auto',  // Only messages scroll
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '15px'
                    }}
                >
                    <div style={{ marginTop: 'auto' }}>
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`message ${message.type}-message`}
                                style={{
                                    maxWidth: '70%',
                                    padding: '10px 15px',
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                    alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                                    backgroundColor: message.type === 'user' ? '#007bff' : '#e9ecef',
                                    color: message.type === 'user' ? 'white' : 'black',
                                    marginLeft: message.type === 'user' ? 'auto' : '0',
                                    marginRight: message.type === 'user' ? '0' : 'auto'
                                }}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input and Button Section - Fixed at bottom */}
                <div style={{
                    marginTop: 'auto',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    backgroundColor: 'white',
                    zIndex: 1  // Ensure input stays above scrolling content
                }}>
                    <input 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        type="text" 
                        placeholder="How can MediCompanion help?" 
                        style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '5px', flex: 1 }} 
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button style={{ padding: '10px 20px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#ddd', cursor: 'pointer' }}>Prescriptions...</button>
                        <button style={{ padding: '10px 20px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#ddd', cursor: 'pointer' }}>Vaccines...</button>
                        <button style={{ padding: '10px 20px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#ddd', cursor: 'pointer' }}>I feel sick...</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbox;