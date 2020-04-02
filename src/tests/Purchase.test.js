import React from "react";
import { render } from "@testing-library/react";
import Purchase from "../components/Purchase";
import { shallow } from "enzyme";
// Configured adapter for Enzyme
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

// Using enzyme to simulate
const wrapper = shallow(<Purchase></Purchase>);

/*
test("renders KEANet <h1> tag", () => {
  const { getByText } = render(<Purchase></Purchase>);
  const linkElement = getByText("KEANet");
  expect(linkElement).toBeInTheDocument();
});


// This test is a Enzyme and Jest specific test. This creates the
// wrapper components as HTML and makes sure that is is rendered probably.
it("should match the snapshot", () => {
  expect(wrapper.html()).toMatchSnapshot();
});

// Testing the actual side effects of click the checkbox
describe("includeInternet function", () => {
  it("should change state of internetConnection to true when checkbox is clicked", () => {
    expect(wrapper.state("internetConnection")).toEqual(false);
    wrapper.find("#includeInternet").simulate("click");
    expect(wrapper.state("internetConnection")).toEqual(true);
    // If not simulated once again, the state will remain price: 200, internetConnection: true
    wrapper.find("#includeInternet").simulate("click");
  });
});
*/

// Testing the parameters passed to includeInternet() function
describe("includeInternet()", () => {
  it("should return a new total price and fail at all datatypes but boolean", () => {
    // Data for inputs with expected outputs
    let mockData = {
      case0: {
        input: true,
        expected: 200
      },
      case1: {
        input: false,
        expected: 0
      },
      case2: {
        input: "stringlala",
        expected: TypeError("Wrong type")
      },
      case3: {
        input: "--",
        expected: TypeError("Wrong type")
      },
      case4: {
        input: 0,
        expected: TypeError("Wrong type")
      },
      case5: {
        input: null,
        expected: TypeError("Wrong type")
      }
    };
    for (let testCase in mockData) {
      const instance = wrapper
        .instance()
        .includeInternet(mockData[testCase].input);
      // Test cases where error is expected
      if (typeof mockData[testCase].expected !== "number") {
        expect(instance).toThrow(mockData[testCase].expected);
      } else {
        // Text cases where value is expected
        expect(instance).toBe(mockData[testCase].expected);

        // The test that will bring peace in the world
        if (!wrapper.state("internetConnection") === false) {
          expect(wrapper.state("internetConnection")).not.toBe(!true);
        }
      }
    }
  });

  // Testing the actual side effects of click to addPhoneLine()
  describe("addPhoneLine() function", () => {
    it("should change state of phoneLines and price when phoneLine is added", () => {
      const instance = wrapper.instance();
      for (let i = 0; i < 9; i++) {
        if(i > 8) {
          expect(instance.addPhoneLine()).toThrow(Error("Can not exceed value of 8"))
        } else {
          expect(wrapper.state("phoneLines")).toBe(i);
          instance.addPhoneLine();
        }
      }
    });
  });

  
  describe("removePhoneLine() function", () => {
    it("should change state of phoneLines and price when phoneLine is removed", () => {
      const instance = wrapper.instance();
      for (let i = 8; i > -2; i--) {
        if(i >= 0) {
          expect(wrapper.state("phoneLines")).toBe(i);
          instance.removePhoneLine();
        } else {
          expect(instance.removePhoneLine()).toThrow(Error("Can not subceed value of 0"))
        }
      }
    });
  });

  describe("selectCellPhone() function", () => {
    it("should add given phone model to the cellPhone state array and return new total price", () => {
          // Data for inputs with expected outputs
    let mockData = {
      case0: {
        input: "Motorola G99",
        expected: 800
      },
      case1: {
        input: "iPhone 99",
        expected: 6800
      },
      case2: {
        input: "Samsung Galaxy 99",
        expected: 7800
      },
      case3: {
        input: "Sony Xperia 99",
        expected: 8700
      },
      case4: {
        input: "Huawei 99",
        expected: 9600
      },
      case5: {
        input: 0,
        expected: TypeError("Wrong type")
      },
      case6: {
        input: 100,
        expected: TypeError("Wrong type")
      },
      case7: {
        input: null,
        expected: TypeError("Wrong type")
      },
      case8: {
        input: () => {console.log("test")},
        expected: TypeError("Wrong type")
      },
      case9: {
        input: {},
        expected: TypeError("Wrong type")
      },
      case10: {
        input: "motorola g99",
        expected: 9600
      },
      case10: {
        input: "iphun4",
        expected: 9600
      },
    };
    // Counter will keep track of how many items have been added to the list
    let counter = 1
    for (let testCase in mockData) {
      const instance = wrapper
        .instance()
        .selectCellPhone(mockData[testCase].input);
      // Test cases where error is expected
      if (typeof mockData[testCase].expected !== "number") {
        expect(instance).toThrow(mockData[testCase].expected);
      } else {
        // Text cases where value is expected
        expect(instance).toBe(mockData[testCase].expected);
        // If the given value is in the priceList then it is expected to have been added to the
        // cellPhones state.
        if(mockData[testCase].input in wrapper.instance().priceList) {
          expect(wrapper.state("cellPhones")).toContain(mockData[testCase].input)
          // How many items has been added to the list
          expect(wrapper.state("cellPhones").length).toBe(counter);
          counter ++
        } else {
          // If the given value is not from the priceList, then we should not be in the
          // cellPhones state.
          expect(wrapper.state("cellPhones")).not.toContain(mockData[testCase].input)
        }
      }
    }
    });
  });

  describe("deselectCellPhone() function", () => {
    it("should remove given phone model from the cellPhone state array and return new total price", () => {
    // Data for inputs with expected outputs
    let mockData = {
      case0: {
        input: "Motorola G99",
        expected: 8800
      },
      case1: {
        input: "iPhone 99",
        expected: 2800
      },
      case2: {
        input: "Samsung Galaxy 99",
        expected: 1800
      },
      case3: {
        input: "Sony Xperia 99",
        expected: 900
      },
      case4: {
        input: "Huawei 99",
        expected: 0
      },
      case5: {
        input: 0,
        expected: TypeError("Wrong type")
      },
      case6: {
        input: 100,
        expected: TypeError("Wrong type")
      },
      case7: {
        input: null,
        expected: TypeError("Wrong type")
      },
      case8: {
        input: () => {console.log("test")},
        expected: TypeError("Wrong type")
      },
      case9: {
        input: {},
        expected: TypeError("Wrong type")
      },
      case10: {
        input: "motorola g99",
        expected: 0
      },
      case10: {
        input: "iphun4",
        expected: 0
      },
    };
    // Counter will keep track of how many items there will be in the state from the beginning
    let counter = wrapper.state("cellPhones").length
    for (let testCase in mockData) {
      const instance = wrapper
        .instance()
        .deselectCellPhone(mockData[testCase].input);
      // Test cases where error is expected
      if (typeof mockData[testCase].expected !== "number") {
        expect(instance).toThrow(mockData[testCase].expected);
      } else {
        // Text cases where value is expected
        expect(instance).toBe(mockData[testCase].expected);
        // If the given value is in the priceList then it is expected to have been removed from the
        // cellPhones state.
        if(mockData[testCase].input in wrapper.instance().priceList) {
          expect(wrapper.state("cellPhones")).not.toContain(mockData[testCase].input)
          // How many items has been added to the list
          counter --
          expect(wrapper.state("cellPhones").length).toBe(counter);
        } else {
          // If the given value is not from the priceList, then nothing will happen.
        }
      }
    }
    });

    describe("buying() function", () => {
      it("should return a string", () => {
        expect(typeof wrapper.instance().buying()).toBe("string")
      });
    });
  });
  });
