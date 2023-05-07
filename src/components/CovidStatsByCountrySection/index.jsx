import React, { Fragment } from "react";
import ReactLoading from "react-loading";
import Twemoji from "react-emoji-render";
import { Pie } from "react-chartjs-2";
import { CountryHeader } from "../CountryHeader";
import Statusblock from "../Statusblock";
import StatLoader from "../StatLoader";

import { pieLegendOpts, pieSizeOpts } from "../../data/data";

const CovidStatsByCountrySection = (props) => {
  const {
    loading,
    countryData,
    countryFlag,
    countryName,
    countryTitle,
    statError,
    countryImg,
    worldImg,
    pieData,
  } = props;

  return (
    <Fragment>
      <CountryHeader
        loading={loading}
        countryFlag={countryFlag}
        countryName={countryTitle}
        statError={statError}
        imgStyle={countryName !== "World" ? countryImg : worldImg}
      />

      <div className="country-info-container">
        {statError ? (
          <div className="stat-error">
            <div>
              Something went wrong <Twemoji text=":'(" />
            </div>
          </div>
        ) : null}

        {countryData && !loading ? (
          countryData.map((curr, idx) => (
            <Statusblock key={idx + 1} packet={curr} />
          ))
        ) : loading ? (
          <StatLoader />
        ) : null}

        {!statError ? (
          <div className="chart-container">
            {pieData && !loading ? (
              <Pie
                data={pieData}
                width={420}
                height={420}
                legend={pieLegendOpts}
                options={pieSizeOpts}
              />
            ) : (
              <div className="chart-loader">
                <ReactLoading
                  type={"bars"}
                  color={"black"}
                  height={"70px"}
                  width={"70px"}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default CovidStatsByCountrySection;
