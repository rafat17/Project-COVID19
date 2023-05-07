import React from "react";
import Select from "react-select";

const SelectCountrySection = ({ countryList, onSelectChange }) => {
  const countryOptions =
    countryList &&
    countryList.map((countryItem) => ({
      label: countryItem,
      value: countryItem,
    }));

  return (
    <div id="country-selection">
      <div id="country-select-heading">View Global / Local Information</div>
      <div id="countries_select">
        <Select
          onChange={onSelectChange}
          options={countryOptions || []}
          isDisabled={countryOptions.length === 0}
        />
      </div>
    </div>
  );
};

export default SelectCountrySection;
