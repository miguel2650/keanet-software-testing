import React from 'react';

function PhoneLinesInput(props) {

    // Takes the parents passed in function (setState)
    // and changes the state based on the current state.
    const handleChange = e => {
        props.setPhoneLinesState(e.target.value)
    }

    return (
        <React.Fragment>
            <input type="number" onChange={handleChange} defaultValue={props.phoneLinesState} min="0" max="10"></input>
            <label>Phone lines</label>
        </React.Fragment>
    )
}

export default PhoneLinesInput