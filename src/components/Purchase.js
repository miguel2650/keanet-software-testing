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

  componentDidMount() {
    console.log("this state: ", this.state);
  }

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
    console.log("pricelist ", this.priceList);
    if (modelName in this.priceList) {
      const newList = [...this.state.cellPhones];
      newList.push(modelName);
      this.setState({ cellPhones: newList });
      this.setState({ price: this.state.price + this.priceList[modelName] });
    }
    return this.state.price;
  };

  deselectCellPhone = modelName => {
    console.log("deselect with ", modelName);
    console.log("cellhpones state", this.state.cellPhones);
    if (this.state.cellPhones.includes(modelName)) {
      const newList = [...this.state.cellPhones];
      const index = newList.indexOf(modelName);
      newList.splice(index, 1);
      this.setState({ cellPhones: newList });
      console.log("newlist ", newList);
      this.setState({ price: this.state.price - this.priceList[modelName] });
    }
    return this.state.price;
  };

  buying = () => {
    return "alert message";
  };

  render() {
    return (
      <React.Fragment>
        <CellPhonesTable
          selectCellPhone={this.selectCellPhone}
          deselectCellPhone={this.deselectCellPhone}
          cellPhones={this.state.cellPhones}
          priceList={this.priceList}
        ></CellPhonesTable>
      </React.Fragment>
    );
  }
}
export default Purchase;
