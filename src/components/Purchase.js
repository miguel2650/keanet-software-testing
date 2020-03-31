import React from "react";
import CellPhonesTable from "./CellPhonesTable";

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      internetConnection: false,
      phoneLines: 0,
      cellPhones: [],
      price: 0
    };
  }

  priceList = {
    "Motorola G99": 800,
    "iPhone 99": 6000,
    "Samsung Galaxy 99": 1000,
    "Sony Xperia 99": 900,
    "Huawei 99": 900
  };

  includeInternet = input => {
    this.setState({ internetConnection: input });
    if (input) {
      this.setState({ price: this.state.price + 200 });
      return this.state.price;
    } else {
      this.setState({ price: this.state.price - 200 });
      return this.state.price;
    }
  };

  addPhoneLine = () => {
    this.setState({ phoneLines: this.state.phoneLines + 1 });
    this.setState({ price: this.state.price + 150 });
  };

  removePhoneLine = () => {
    this.setState({ phoneLines: this.state.phoneLines - 1 });
    this.setState({ price: this.state.price - 150 });
  };

  selectCellPhone = modelName => {
    if (modelName in this.priceList) {
      const newList = [...this.state.cellPhones];
      newList.push(modelName);
      this.setState({ cellPhones: newList });
      this.setState({ price: this.state.price + this.priceList[modelName] });
    }
    return this.state.price;
  };

  deselectCellPhone = modelName => {
    if (this.state.cellPhones.includes(modelName)) {
      const newList = [...this.state.cellPhones];
      const index = newList.indexOf(modelName);
      newList.splice(index, 1);
      this.setState({ cellPhones: newList });
      this.setState({ price: this.state.price - this.priceList[modelName] });
    }
    return this.state.price;
  };

  buying = () => {
    if (this.state.price <= 0) {
      return "Please select some items before checking out";
    } else {
      let buyMessage = "";
      if (this.state.internetConnection) {
        buyMessage += "1x Internet Connection = 200 DKK (monthly) \n";
      }
      if (this.state.phoneLines > 0) {
        buyMessage += `${this.state.phoneLines}x Phone Lines = ${
          this.state.phoneLines * 150
        } DKK (monthly)\n`;
      }
      if (this.state.cellPhones.length > 0) {
        var counts = {};
        for (var i = 0; i < this.state.cellPhones.length; i++) {
          counts[this.state.cellPhones[i]] =
            1 + (counts[this.state.cellPhones[i]] || 0);
        }
        for (const phone in counts) {
          buyMessage += `${counts[phone]}x ${phone} = ${
            counts[phone] * this.priceList[phone]
          } DKK \n`;
        }
      }
      buyMessage += ` \n You bought for a total of: ${this.state.price} DKK \n`;
      return buyMessage;
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>KEANet</h1>
        <input
          type="checkbox"
          onClick={() => this.includeInternet(!this.state.internetConnection)}
        ></input>
        <label>Internet Connection</label>
        <br></br>
        <label>Phone Lines </label>
        <input
          type="number"
          max="8"
          min="0"
          onKeyDown={e => e.preventDefault()}
          onAuxClick={() =>
            window.confirm(
              "Please use the arrows instead of trying to break the system"
            )
          }
          onChange={e => {
            if (e.target.value > this.state.phoneLines) {
              this.addPhoneLine();
            } else {
              this.removePhoneLine();
            }
          }}
        ></input>
        <br></br>
        <CellPhonesTable
          selectCellPhone={this.selectCellPhone}
          deselectCellPhone={this.deselectCellPhone}
          cellPhones={this.state.cellPhones}
          priceList={this.priceList}
        ></CellPhonesTable>
        <label>Total price: {this.state.price} DKK</label>
        <br></br>
        <button
          onClick={() => {
            window.confirm(this.buying());
          }}
        >
          Buy
        </button>
      </React.Fragment>
    );
  }
}
export default Purchase;
