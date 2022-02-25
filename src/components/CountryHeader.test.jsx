import React from "react";
import { render } from "@testing-library/react";
import { CountryHeader } from "./CountryHeader";

const requiredProps = {
  countryName: "Afghanistan",
  countryFlag: "https://disease.sh/assets/img/flags/af.png",
  imgStyle: {
    boxShadow: "3px 2px 5px 2px #ccc",
    height: "28px",
    marginLeft: "5px",
    marginTop: "2px",
    position: "absolute",
    width: "46px",
  },
  loading: false,
  statError: false,
};

describe("tests the CountryHeader component", () => {
  let component;

  beforeEach(() => {
    component = render(<CountryHeader {...requiredProps} />);
  });

  test("renders the CountryHeader component as expected", () => {
    expect(component).toMatchSnapshot();
  });

  test("renders ReactLoading component", () => {
    component.rerender(<CountryHeader loading={true} />);

    const countryLoaderClassName =
      component.container.getElementsByClassName("country-loader");

    expect(countryLoaderClassName.length).toEqual(1);
  });

  test("renders loading statistics error when no data is present", () => {
    const noDataProps = {
      loading: false,
      statError: true,
    };

    component.rerender(<CountryHeader {...noDataProps} />);
    const countryHeadingChildNodesCount =
      component.container.querySelector("#country-heading").childNodes.length;

    expect(countryHeadingChildNodesCount).toEqual(0);
  });
});
