
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';

function App() {
    
  return (
    // <div className="App">
    //     <Navbar />
    //   <div className="contents">
    //      <Home />
    //   </div>

    //   <aside>Side bar</aside>
      
    // </div>

    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar/>



      <Chatbox/>
    </div>
  );
}

export default App;
