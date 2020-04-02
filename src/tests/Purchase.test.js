import React from "react";
import { render } from "@testing-library/react";
import Purchase from "../components/Purchase";
import { shallow } from "enzyme";

test("renders KEANet <h1> tag", () => {
  const { getByText } = render(<Purchase></Purchase>);
  const linkElement = getByText("KEANet");
  expect(linkElement).toBeInTheDocument();
});

// Using enzyme to simulate
const wrapper = shallow(<Purchase></Purchase>);

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

// Testing the parameters passed to includeInternet() function
describe("includeInternet()", () => {
  it("should fail at all datatypes but boolean", () => {
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
  });
/*

TODO: We are unable to test for type errors
Look inside Purchase.JS @ includeInternet()
The input of whatever type will never crash the application.
Any type of input can be acceptable.
Changing to TypeScript can fix our issue or adding some kind of checking mechanism.
Like: If (typeOf(input) === Boolean) {} else {throw new Error()}
Give me your feedback.

------------------------------------------------------
Dont mind this, was used for testing a error testcase.

      let tree2 = component.includeInternet("string");
      expect(tree2).toThrow();

      case3: {
        input: "thisIsString",
        expected: new Error("Eror")
      }
*/
