import React, { useState } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import InternetCheckbox from "./components/InternetCheckbox";
import PhoneLinesInput from "./components/PhoneLinesInput";
import CellPhonesTable from "./components/CellPhonesTable";
import Purchase from "./components/Purchase";

function App() {
  // State controlling internet checkbox
  const [internetState, setInternetState] = useState(false);
  const [phoneLinesState, setPhoneLinesState] = useState(0);
  const [cellPhonesState, setCellPhonesState] = useState([
    {
      name: "Motorola G99",
      value: 0,
      price: 800
    },
    {
      name: "iPhone 99",
      value: 0,
      price: 6000
    },
    {
      name: "Samsung Galaxy 99",
      value: 0,
      price: 1000
    },
    {
      name: "Sony Xperia 99",
      value: 0,
      price: 900
    },
    {
      name: "Huawei 99",
      value: 0,
      price: 900
    }
  ]);
  const [priceState, setPriceState] = useState();

  return (
    /*
    <Container>
      <Col lg="10" md="8" sm="6">
        <h1>KEANet</h1>
        <Row>
          <InternetCheckbox
            internetState={internetState}
            setInternetState={setInternetState}
          ></InternetCheckbox>
        </Row>
        <Row>
          <PhoneLinesInput
            phoneLinesState={phoneLinesState}
            setPhoneLinesState={setPhoneLinesState}
          ></PhoneLinesInput>
        </Row>
        <Row>
          <CellPhonesTable
            cellPhonesState={cellPhonesState}
            setCellPhonesState={setCellPhonesState}
          ></CellPhonesTable>
        </Row>
      </Col>
      <Purchase></Purchase>
      <label>Total price: {}</label>
      <Button onClick={() => console.log(phoneLinesState)}>
        Test state of phone
      </Button>
    </Container>
    */
    <Purchase></Purchase>
  );
}

export default App;
