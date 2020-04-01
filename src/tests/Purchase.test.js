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
    //let component = renderer.create(<Purchase></Purchase>).getInstance();
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
    let counter = 0;
    for (let testCase in mockData) {
      console.log("Test case: ", counter);
      const instance = wrapper
        .instance()
        .includeInternet(mockData[testCase].input);
      // Test cases where error is expected
      if (counter >= 2) {
        expect(instance).toThrow(mockData[testCase].expected);
      } else {
        // Text cases where value is expected
        expect(instance).toBe(mockData[testCase].expected);
      }
      counter++;
    }
  });

  // Testing the actual side effects of click to addPhoneLine()
  describe("addPhoneLine() function", () => {
    it("should change state of phoneLines and price when phoneLine is added", () => {
      const instance = wrapper.instance();
      expect(wrapper.state("phoneLines")).toBe(0);
      instance.addPhoneLine();
      expect(wrapper.state("phoneLines")).toBe(1);
    });
  });

  describe("removePhoneLine() function", () => {
    it("should change state of phoneLines and price when phoneLine is removed", () => {
      const instance = wrapper.instance();
      expect(wrapper.state("phoneLines")).toBe(1);
      instance.removePhoneLine();
      expect(wrapper.state("phoneLines")).toBe(0);
      instance.removePhoneLine();
      expect(wrapper.state("phoneLines")).toBe(-1);
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
