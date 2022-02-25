import React from "react";
import ReactLoading from "react-loading";

export const CountryHeader = (props) => {
  const { countryName, countryFlag, imgStyle, loading, statError } = props;

  const countryNameHeader = !statError && (
    <div>
      <span>{countryName}</span>
      <img style={imgStyle} src={countryFlag} />
    </div>
  );

  return (
    <div id="country-heading">
      {loading ? (
        <ReactLoading className="country-loader" type="bars" color="black" height={50} width={50} />
      ) : (
        countryNameHeader
      )}
    </div>
  );
};
