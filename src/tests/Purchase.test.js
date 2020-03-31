import React from "react";
import { render } from "@testing-library/react";
import { includeInternet } from "../components/Purchase";
import Purchase from "../components/Purchase";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

test("renders KEANet <h1> tag", () => {
  const { getByText } = render(<Purchase></Purchase>);
  const linkElement = getByText("KEANet");
  expect(linkElement).toBeInTheDocument();
});

// Using enzyme to simulate
const wrapper = shallow(<Purchase></Purchase>);

describe("includeInternet function", () => {
  it("should change state of internetConnection to true when checkbox is clicked", () => {
    expect(wrapper.state("internetConnection")).toEqual(false);
    wrapper.find("#includeInternet").simulate("click");
    expect(wrapper.state("internetConnection")).toEqual(true);
  });
});
