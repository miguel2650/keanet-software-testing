import React, { useState } from "react";

function CellPhonesTable(props) {
  const [selectedPhone, setSelectedPhone] = useState();

  const handleAdd = e => {
    // Never update state directly.
    const newState = [...props.cellPhonesState];
    newState[selectedPhone].value = newState[selectedPhone].value + 1;
    props.setCellPhonesState(newState);
    console.log(props.cellPhonesState);
  };

  const handleDelete = e => {
    const newState = [...props.cellPhonesState];
    newState[selectedPhone].value = newState[selectedPhone].value - 1;
    props.setCellPhonesState(newState);
    console.log(props.cellPhonesState);
  };

  return (
    <React.Fragment>
      <label>Cell phones</label>
      <table>
        <tbody>
          <tr>
            <td>
              <select
                size={props.cellPhonesState.length}
                id="txtCellPhones"
                style={{ width: 200 }}
              >
                {props.cellPhonesState.map((phone, index) => (
                  <option
                    key={phone.name + index}
                    value={phone.name}
                    onClick={() => setSelectedPhone(index)}
                  >
                    {phone.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={handleAdd}>&gt;</button>
              <br></br>
              <button onClick={handleDelete}>&lt;</button>
            </td>
            <select
              size={props.cellPhonesState.length}
              id="selectedPhones"
              style={{ width: 200 }}
            >
              {props.cellPhonesState.map((phone, index) => {
                if (phone.value > 0) {
                  let optionsObjects = [];
                  for (let i = 0; i < phone.value; i++) {
                    optionsObjects.push(
                      <option
                        key={phone.name + i}
                        value={phone.name}
                        onClick={() => setSelectedPhone(index)}
                      >
                        {phone.name}
                      </option>
                    );
                  }
                  return optionsObjects;
                }
              })}
            </select>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default CellPhonesTable;
