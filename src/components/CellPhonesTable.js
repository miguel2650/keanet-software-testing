import React, { useState } from "react";

const phonesList = [
  {
    name: "Motorola G99",
    value: 0
  },
  {
    name: "iPhone 99",
    value: 0
  },
  {
    name: "Samsung Galaxy 99",
    value: 0
  },
  {
    name: "Sony Xperia 99",
    value: 0
  },
  {
    name: "Huawei 99",
    value: 0
  }
];

function CellPhonesTable(props) {
  const [selectedPhone, setSelectedPhone] = useState();

  // Takes the parents passed in function (setState)
  // and changes the state based on the current state.
  const handleChange = e => {
    setSelectedPhone(e.target.value);
    console.log(selectedPhone);
  };

  const handleAdd = e => {
    console.log(selectedPhone, "selected phone");
    // Never update state directly.
    console.log(e.target.value);
    const newState = [...props.cellPhonesState];
    newState[0].value = newState[0].value + 1;
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
                onChange={handleChange}
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
              <button>&lt;</button>
            </td>
            <select>
              {props.cellPhonesState.map((phone, index) => {
                if (phone.value < 0) {
                  return (
                    <option key={phone.name + index} value={phone.name}>
                      {phone.name}
                    </option>
                  );
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
