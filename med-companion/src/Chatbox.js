import { useState } from "react";

const Chatbox = () => {
    const [inputValue, setInputValue] = useState("");

    const handleClickPrescription = () => {
        console.log("Prescription clicked")
    }
    const handleClickVaccine = () => {
        console.log("Vaccine clicked")
    }
    const handleClickSick = () => {
        console.log("Sick clicked")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          
          console.log(inputValue);
          setInputValue("");
          
        }
    }

    return (  
        <div className="chatbox">
            {/* Chat Area */}
            <div style={{ width: '1100px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '600px', paddingLeft: '20px', paddingRight: '20px' }}>

            {/* Input and Button Section */}
            <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder="How can MediCompanion help?" style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '5px', flex: 1 }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleClickPrescription} style={{ padding: '10px 20px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#ddd', cursor: 'pointer' }}>Prescriptions...</button>
                    <button onClick={handleClickVaccine} style={{ padding: '10px 20px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#ddd', cursor: 'pointer' }}>Vaccines...</button>
                    <button onClick={handleClickSick} style={{ padding: '10px 20px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#ddd', cursor: 'pointer' }}>I feel sick...</button>
                </div>
            </div>

            </div>


        </div>

    );
}
 
export default Chatbox;