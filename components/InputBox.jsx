import React from 'react'

const InputBox = ({ input, setInput, placeholder, buttonText, symbol, handleClick, handleKeydown }) => {
    return (
        <div className="input_box">
            <input id="new_item_input" name="Add to agenda" type="text" className="input_field"
                placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeydown} />
            <input onClick={handleClick} className="add_btn" type="button" value={buttonText} />
            <span onClick={handleClick} className="add_symbol">{symbol}</span>
        </div>
    )
}

export default InputBox