import React from "react"

const ButtonComponent = ({ togglePopup }) => {
    return (
        <div>
            <button onClick={togglePopup}>Open Card</button>
        </div>
    )
}

export default ButtonComponent;