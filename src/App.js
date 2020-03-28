import React, { useState } from 'react';
import { Container, Col, Button, Row } from "react-bootstrap"
import InternetCheckbox from "./components/InternetCheckbox"
import PhoneLinesInput from "./components/PhoneLinesInput"
import CellPhonesTable from './components/CellPhonesTable';

function App() {
  // State controlling internet checkbox
  const [internetState, setInternetState] = useState(false)
  const [phoneLinesState, setPhoneLinesState] = useState(0)
  const [cellPhonesState, setCellPhonesState] = useState([
    {
      name:"Motorola G99",
      value:0
    },
    {
      name:"iPhone 99",
      value:0
    },
    {
      name:"Samsung Galaxy 99",
      value:0
    },
    {
      name:"Sony Xperia 99",
      value:0
    },
    {
      name:"Huawei 99",
      value:0
    }
  ])

  return (
    <Container >
      <Col lg="10" md="8" sm="6">
      <h1>KEANet</h1>
      <Row>
      <InternetCheckbox internetState={internetState} setInternetState={setInternetState}></InternetCheckbox>
      </Row>
      <Row>
      <PhoneLinesInput phoneLinesState={phoneLinesState} setPhoneLinesState={setPhoneLinesState}></PhoneLinesInput>
      </Row>
      <Row>
        <CellPhonesTable cellPhonesState={cellPhonesState} setCellPhonesState={setCellPhonesState}></CellPhonesTable>
      </Row>
      </Col>
      <Button onClick={() =>console.log(phoneLinesState)}>Test state of phone</Button>
    </Container>
  );
}

export default App;
