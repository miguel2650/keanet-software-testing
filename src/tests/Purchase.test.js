import React from "react";
import { render } from "@testing-library/react";
import { includeInternet, selectCellPhone } from "../components/Purchase";
import Purchase from "../components/Purchase";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

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
  });
});

// Testing the parameters passed to includeInternet() function
describe("includeInternet()", () => {
  it("should fail at all datatypes but boolean", () => {
    let component = renderer.create(<Purchase></Purchase>).getInstance();
    // Data for inputs with expected outputs
    let mockData = {
      case1: {
        input: true,
        expected: 200
      },
      case2: {
        input: false,
        expected: 0
      }
    };
    for (let testCase in mockData) {
      let tree = component.includeInternet(mockData[testCase].input);
      expect(tree).toBe(mockData[testCase].expected);
    }
  });
});
