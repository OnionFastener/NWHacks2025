const Sidebar = () => {
    const userName = "John";

    const handleClick = () => {
        console.log("healthcard clicked")
    }
    return (  
        <div className="sidebar">
            {/* Sidebar */}
            <div style={{ width: '90%', height: '100%', backgroundColor: '#f8f8f8', padding: '20px', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <h2 style={{paddingTop: '20px', alignSelf: 'center'}}> {userName}'s Health Companion</h2>
                <button onClick={handleClick} style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', marginTop: '20px' }}>View My Healthcard</button>
                <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', marginTop: '20px' }}>Update Health Info</button>
            </div>
        </div>
    );
}
 
export default Sidebar;