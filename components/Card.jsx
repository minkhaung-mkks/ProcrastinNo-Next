import React from 'react'

const Card = ({ index, handleClick, text }) => {
    return (
        <div key={index} className="agenda_card" onClick={handleClick}>
            <h4 className="agenda_txt">{text}</h4>
        </div>
    )
}

export default Card
