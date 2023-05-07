import React from "react";
import AsyncSelect from "react-select/async";
import ReactSelectCustomComponents from "../../helpers/ReactSelectCustomComponents";

const SelectCountrySection = (props) => {
  const { loadCountryNamesList, countrySelected, onSelectChange } = props;

  return (
    <div id="country-selection">
      <div id="country-select-heading">View Global / Local Information</div>
      <div id="countries_select">
        <AsyncSelect
          cacheOptions={true}
          defaultOptions={true}
          isSearchable={false}
          loadOptions={loadCountryNamesList}
          value={countrySelected}
          onChange={onSelectChange}
          components={ReactSelectCustomComponents}
        />
      </div>
    </div>
  );
};

export default SelectCountrySection;
