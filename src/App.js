import React, { useEffect, useState } from "react";
import "./css/Header.css";
import "./css/CountrySelect.css";
import "./css/CountryStat.css";
import "./css/Graph.css";

import "./css/Media.css";

import {
  StartHeader,
  SelectCountrySection,
  CovidStatsByCountrySection,
  CovidStatsByCountryTableSection,
} from "./components";

//custom data and function modules
import { worldImg, countryImg } from "./data/data";
import {
  structureCountryData,
  structurePieData,
  formatHistoricalData,
  formatWeeklyData,
} from "./data/functions";

//custom api_functions modules
import {
  getCountryNames,
  getCountryCovidData,
  getWorldWideCovidData,
  getLastWeekDataOfWorld,
  getLastWeekDataByCountry,
} from "./data/api_functions";

import defaultCountryOption from "./constants/defaultObjects";

function App() {
  const [countryList, setCountryList] = useState([]);
  const [countryTitle, setCountryTitle] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [countryFlag, setCountryFlag] = useState(null);
  const [countryWeekCases, setCountryWeekCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [histLoading, setHistLoading] = useState(false);
  const [countryName, setCountryName] = useState("World");
  const [daysSelect, setDaysSelect] = useState("14 days");
  const [viewsSelect, setViewsSelect] = useState("Vertical Bar");
  const [noHistory, setNoHistory] = useState(false);
  const [countrySelected, setCountrySelected] = useState(defaultCountryOption);

  const [selectError, setSelectError] = useState(false);
  const [statError, setStatError] = useState(false);
  const [graphError, setGraphError] = useState(false);

  const daysAmntChange = (dayOption) => {
    setHistLoading(true);
    setDaysSelect(dayOption?.value);
  };

  const viewTypeChange = (viewTypeOption) => {
    setViewsSelect(viewTypeOption?.value);
  };

  const loadCountryNamesList = () =>
    getCountryNames().then((response) => {
      const countriesList = response.map((countryData) => countryData.country);
      setCountryList(countriesList);
      const countriesListOptions = countriesList.map((countryName) => {
        return { label: countryName, value: countryName };
      });
      return [{ label: "World", value: "World" }, ...countriesListOptions];
    });

  useEffect(() => {
    loadCountryNamesList();
  }, [countryList.length]);

  //get the selected country data
  useEffect(() => {
    if (selectError || statError || graphError) {
      setSelectError(false);
      statError(false);
      graphError(false);
    }

    function getcountryData(res) {
      if (countryTitle) setCountryTitle(null);
      setCountryFlag(null);

      if (countryName === "World") {
        setCountryFlag(require("./img/world.png"));
        setCountryTitle("World");
      } else {
        setCountryFlag(res.countryInfo.flag);
        setCountryTitle(res.country);
      }

      setLoading(false);
      setCountryData(structureCountryData(res));
      setPieData(structurePieData(res));
    }

    if (countryName !== "World") {
      getCountryCovidData(countryName)
        .then((res) => getcountryData(res))
        .catch((err) => {
          setLoading(false);
          setStatError(true);
        });

      getLastWeekDataByCountry(countryName)
        .then((res) => {
          if (res.message) setNoHistory(true);
          else {
            if (noHistory) setNoHistory(false);
            const { history, history_indices } = formatHistoricalData(
              res,
              daysSelect
            );
            setCountryWeekCases(formatWeeklyData(history, history_indices));
          }

          setHistLoading(false);
        })
        .catch((err) => {
          setHistLoading(false);
          setGraphError(true);
        });
    } else {
      getWorldWideCovidData()
        .then((res) => getcountryData(res))
        .catch((err) => {
          setLoading(false);
          setStatError(true);
        });

      getLastWeekDataOfWorld()
        .then((res) => {
          if (res.message) setNoHistory(true);
          else {
            if (noHistory) setNoHistory(false);

            setCountryWeekCases(null);
            const { history, history_indices } = formatHistoricalData(
              res,
              daysSelect
            );
            setCountryWeekCases(formatWeeklyData(history, history_indices));
          }

          setHistLoading(false);
        })
        .catch((err) => {
          setHistLoading(false);
          setGraphError(true);
        });
    }
  }, [countryName, daysSelect]);

  const onSelectChange = (selectedOption) => {
    setCountrySelected(selectedOption);
    setCountryName(selectedOption?.value);
  };

  return (
    <>
      <StartHeader />
      <SelectCountrySection
        loadCountryNamesList={loadCountryNamesList}
        countrySelected={countrySelected}
        onSelectChange={onSelectChange}
      />
      <CovidStatsByCountrySection
        loading={loading}
        countryData={countryData}
        countryFlag={countryFlag}
        countryName={countryName}
        countryTitle={countryTitle}
        statError={statError}
        countryImg={countryImg}
        worldImg={worldImg}
        pieData={pieData}
      />
      <CovidStatsByCountryTableSection
        graphError={graphError}
        noHistory={noHistory}
        viewTypeChange={viewTypeChange}
        daysAmntChange={daysAmntChange}
        daysSelect={daysSelect}
        viewsSelect={viewsSelect}
        countryWeekCases={countryWeekCases}
        countryData={countryData}
        countryList={countryList}
        histLoading={histLoading}
      />
    </>
  );
}

export default App;
