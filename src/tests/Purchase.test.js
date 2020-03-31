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

/*
test("includeInternet", () => {
  //const value = includeInternet(true);
  expect(includeInternet(true).toBe(200));
});
*/

describe("includeInternet function", () => {
  it("should change checkbox and price", () => {
    const wrapper = shallow(<Purchase></Purchase>);
    expect(wrapper.instance().includeInternet(true)).equals(true);
  });
});
