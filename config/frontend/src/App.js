import React from 'react';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Sidebar/>
      <Chatbox/>
    </div>
  );
}

export default App;