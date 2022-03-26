import React from "react";
import TimelineSelectBox from "./TimelineSelectBox";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/styles";

const customStyles = makeStyles({
  root: {
    left: "11em",
    bottom: "0.55em",
    width: "3em",
    height: "65%",
    position: "absolute",
    marginLeft: ".15em",
    marginBottom: ".45em",
  },

  imgIcon: {
    width: "100%",
    height: "100%",
  },
});

const daysCountTimelineOptions = [
  { label: "7 days", value: "7 days" },
  { label: "14 days", value: "14 days" },
  { label: "20 days", value: "20 days" },
  { label: "30 days", value: "30 days" },
];

const graphTypeOptions = [
  { label: "Line", value: "Line" },
  { label: "Vertical Bar", value: "Vertical Bar" },
  { label: "Horizontal Bar", value: "Horizontal Bar" },
];

function TimelineHeader(props) {
  const classes = customStyles();
  return (
    <div id="timeline-header">
      <div className="timeline-content" id="timeline-title">
        COVID-19 Timeline
      </div>
      <Icon component="div" className={classes.root}>
        <img
          className={classes.imgIcon}
          src="https://image.flaticon.com/icons/png/512/554/554717.png"
        />
      </Icon>
      <div className="timeline-content" id="timeline-select">
        <div className="time-select-container">
          <TimelineSelectBox
            graphError={props.graphError}
            noHistory={props.noHistory}
            tHeaderName="Days"
            selectOptions={daysCountTimelineOptions}
            onChange={props.daysChange}
            optVal={props.daysSelect}
          />
          <TimelineSelectBox
            graphError={props.graphError}
            noHistory={props.noHistory}
            tHeaderName="View as"
            selectOptions={graphTypeOptions}
            onChange={props.viewChange}
            optVal={props.viewsSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default TimelineHeader;
