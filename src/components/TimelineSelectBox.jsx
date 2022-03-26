import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Select from "react-select";
import ReactSelectCustomComponents from "../helpers/ReactSelectCustomComponents";

const customStyles = makeStyles({
  root: {
    width: "10em",
    marginRight: ".45em",
    background: "#f8f8f8",
    borderRadius: "5px",
    color: "#450907",
    fontWeight: "600",
    textAlign: "justify",
    textAlignLast: "center",
    fontStyle: "italic",
  },
});

const TimelineSelectBox = (props) => {
  const { tHeaderName, optVal, onChange, noHistory, graphError, selectOptions } =
    props;

  const isDataNotAvailable = noHistory || graphError;

  return (
    <Fragment>
      <div className="time-select-content time-select-content-header">
        {tHeaderName} :
      </div>
      <div className="time-select-content time-select-content__select-box">
        <Select
          isSearchable={false}
          value={{label: optVal, value: optVal }}
          onChange={onChange}
          disabled={isDataNotAvailable}
          options={selectOptions}
          components={ReactSelectCustomComponents}
        />
      </div>
    </Fragment>
  );
};



export default TimelineSelectBox;
