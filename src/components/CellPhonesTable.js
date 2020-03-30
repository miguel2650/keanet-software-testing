import React, { useState } from "react";

function CellPhonesTable(props) {
  console.log("pricelist from cellphonestable ", props.priceList);
  const [selectedPhone, setSelectedPhone] = useState();

  // Contains <option> html elements
  let listOfPhones = [];

  Object.keys(props.priceList).forEach((phone, index) => {
    listOfPhones.push(
      <option key={phone + index} value={phone}>
        {phone}
      </option>
    );
  });

  console.log("State of select", selectedPhone);
  return (
    <React.Fragment>
      <label>Cell phones</label>
      <table>
        <tbody>
          <tr>
            <td>
              <select
                size={listOfPhones.length}
                id="cellPhones"
                style={{ width: 200 }}
                onChange={e => setSelectedPhone(e.target.value)}
              >
                {listOfPhones}
              </select>
            </td>
            <td>
              <button onClick={() => props.selectCellPhone(selectedPhone)}>
                &gt;
              </button>
              <br></br>
              <button onClick={() => props.deselectCellPhone(selectedPhone)}>
                &lt;
              </button>
            </td>
            <select
              size={listOfPhones.length}
              id="selectedPhones"
              style={{ width: 200 }}
              onChange={e => setSelectedPhone(e.target.value)}
            >
              {props.cellPhones.map((value, index) => (
                <option key={value + index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default CellPhonesTable;
/*
{
  props.cellPhones.map((phone, index) => {
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
  });
}
*/
