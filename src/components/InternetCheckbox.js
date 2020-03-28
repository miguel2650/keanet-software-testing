import React from 'react';

function InternetCheckbox(props) {

    // Takes the parents passed in function (setState)
    // and changes the state based on the current state.
    const handleChange = e => {
        props.setInternetState(!props.internetState)
    }

    return (
        <React.Fragment>
            <input type="checkbox" onClick={handleChange}></input>
            <label>Internet Connection</label>
        </React.Fragment>
    )
}

export default InternetCheckbox