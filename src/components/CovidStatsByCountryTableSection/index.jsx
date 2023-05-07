import React, { Fragment } from "react";
import { Bar, HorizontalBar, Line } from "react-chartjs-2";
import { Twemoji } from "react-emoji-render";
import ReactLoading from "react-loading";
import TimelineHeader from "../TimelineHeader";

import { barStyleGetter } from "../../data/functions";
import { globalLegendOpts, lineOpts } from "../../data/data";

const CovidStatsByCountryTableSection = (props) => {
  const {
    graphError,
    noHistory,
    viewTypeChange,
    daysAmntChange,
    daysSelect,
    viewsSelect,
    countryWeekCases,
    countryData,
    countryList,
    histLoading,
  } = props;

  function renderViewType(countryWeekCases) {
    if (histLoading)
      return <ReactLoading type="bars" color="black" height="70" width="70" />;

    if (noHistory)
      return (
        <div className="history-error">
          No timeline data available <Twemoji text=":/" />
        </div>
      );

    const visualType =
      viewsSelect === "Horizontal Bar" ? (
        <HorizontalBar
          data={countryWeekCases}
          options={barStyleGetter(true)}
          legend={globalLegendOpts}
        />
      ) : viewsSelect === "Line" ? (
        <Line
          data={countryWeekCases}
          options={lineOpts}
          legend={globalLegendOpts}
        />
      ) : (
        <Bar
          data={countryWeekCases}
          options={barStyleGetter(false)}
          legend={globalLegendOpts}
        />
      );

    return visualType;
  }

  return (
    <Fragment>
      <TimelineHeader
        graphError={graphError}
        noHistory={noHistory}
        viewChange={viewTypeChange}
        daysChange={daysAmntChange}
        daysSelect={daysSelect}
        viewsSelect={viewsSelect}
      />

      <div className="graph-section">
        <div className="graph-container">
          {countryWeekCases && countryData && countryList.length !== 0 ? (
            renderViewType(countryWeekCases)
          ) : graphError ? (
            <div className="graph-error">
              Something went wrong <Twemoji text=":'(" />
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default CovidStatsByCountryTableSection;
