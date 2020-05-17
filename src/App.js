import React, { useEffect, useState } from 'react'
import './css/Header.css'
import './css/CountrySelect.css'
import './css/CountryStat.css'
import './css/Graph.css'

import './css/Media.css'

//built-in components
import ReactLoading  from 'react-loading'
import Twemoji from "react-emoji-render";

//components
import Statusblock from './components/Statusblock'
import { CountryHeader } from './components/CountryHeader'
import TimelineHeader from './components/TimelineHeader'
import StartHeader from './components/StartHeader'
import StatLoader from './components/StatLoader'

//custom data and function modules
import { worldImg, countryImg, pieSizeOpts, pieLegendOpts} from './data/data'
import { structureCountryData, structurePieData } from './data/functions'
import { formatHistoricalData, formatWeeklyData } from './data/functions'
import { barStyleGetter } from './data/functions'

//custom graph custom styles
import { globalLegendOpts, lineOpts } from './data/data'


//custom api_functions modules
import { getCountryCovidData, getWorldWideCovidData } from './data/api_functions'
import { getLastWeekDataOfWorld, getLastWeekDataByCountry } from './data/api_functions'
import { getCountryNames } from './data/api_functions'

//package components from react-chartjs-2 npm package
import { Pie, Bar, Line, HorizontalBar } from 'react-chartjs-2'
import {NativeSelect, Input} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


function App() {

  const [countryList, setCountryList] = useState([])
  const [countryTitle, setCountryTitle] = useState(null)
  const [countryData, setCountryData] = useState(null)
  const [pieData, setPieData] = useState(null)
  const [countryFlag, setCountryFlag] = useState(null)
  const [countryWeekCases, setCountryWeekCases] = useState(null)
  const [loading, setLoading] = useState(true)
  const [histLoading, setHistLoading] = useState(false)
  const [countryName, setCountryName] = useState('World')
  const [daysSelect, setDaysSelect] = useState('14 days')
  const [viewsSelect, setViewsSelect] = useState('Vertical Bar')
  const [noHistory, setNoHistory] = useState(false)

  const [selectError, setSelectError] = useState(false)
  const [statError, setStatError] = useState(false)
  const [graphError, setGraphError] = useState(false)

  


  function daysAmntChange(e) {
    setHistLoading(true) 
    setDaysSelect(e.target.value) 
  }

  function viewTypeChange(e) { setViewsSelect(e.target.value) }

  function renderViewType(countryWeekCases) {

    if(histLoading) return <ReactLoading type={'bars'} color={'black'} height={'70px'} width={'70px'} />

    if(noHistory)  return <div className="history-error">No timeline data available <Twemoji text=":/" /></div>

    const visualType = (viewsSelect === 'Horizontal Bar') ?
      <HorizontalBar data={countryWeekCases} options={barStyleGetter(true)} legend={globalLegendOpts} /> :
      (viewsSelect === 'Line') ? <Line data={countryWeekCases} options={lineOpts} legend={globalLegendOpts} />: 
      <Bar data={countryWeekCases} options={barStyleGetter(false)} legend={globalLegendOpts} />

    return visualType
  }



  useEffect(() => {

    //get all countries inside the selection
    getCountryNames()
      .then(res => {
        console.log(res)
        setCountryList(['World', ...res])
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setSelectError(true)
      })

  }, [countryList.length])


  //get the selected country data
  useEffect(() => {

    if(selectError || statError || graphError){
      setSelectError(false)
      statError(false)
      graphError(false)
    }

    function getcountryData(res) {

      if(countryTitle) setCountryTitle(null)
      setCountryFlag(null)

      if (countryName === 'World') {
        setCountryFlag(require('./img/world.png'))
        setCountryTitle('World')
      }
      else {
        setCountryFlag(res.countryInfo.flag)
        setCountryTitle(res.country)
      }

      setLoading(false)
      setCountryData(structureCountryData(res))
      setPieData(structurePieData(res))
    }


    if (countryName !== "World") {

      getCountryCovidData(countryName)
        .then(res => getcountryData(res))
        .catch(err => {
          setLoading(false)
          setStatError(true)
        })

      getLastWeekDataByCountry(countryName)
        .then(res => {

          if(res.message) setNoHistory(true)

          else{
            if(noHistory) setNoHistory(false)
            const { history, history_indices } = formatHistoricalData(res, daysSelect)
            setCountryWeekCases(formatWeeklyData(history, history_indices))
          }
         
          setHistLoading(false)

        })
        .catch(err => {
          setHistLoading(false)
          setGraphError(true)
        })

    }

    else {

      getWorldWideCovidData()
        .then(res => getcountryData(res))
        .catch(err => {
          setLoading(false)
          setStatError(true)
        })

      getLastWeekDataOfWorld()
        .then(res => {

          if(res.message) setNoHistory(true)

          else{
            
            if(noHistory) setNoHistory(false)
            
            setCountryWeekCases(null)
            const { history, history_indices } = formatHistoricalData(res, daysSelect)
            setCountryWeekCases(formatWeeklyData(history, history_indices))
          }

          setHistLoading(false)

        })
        .catch(err => {
          setHistLoading(false)
          setGraphError(true)
        })

    }

  }, [countryName, daysSelect])



const customStyles = makeStyles({
    root: {
        width: '15em',
        marginRight: '.45em',
        background: '#f8f8f8',
        borderRadius: '5px',
        color: '#450907',
        fontSize: '1.1em',
        fontWeight: '600',
        textAlign: 'justify',
        textAlignLast: 'center',
        fontStyle: 'italic'
    }
});



  const classes = customStyles()
  return (
    <>
      <StartHeader />
      <div id="country-selection">
        <div id="country-select-heading">View Global / Local Information</div>
        <div id="countries_select">
          <NativeSelect onChange={e => 
          {
            setLoading(true)
            setCountryName(e.target.value)
          }}
          input={<Input classes={{root: classes.root}} />} 
          value={countryName}
          disabled={(countryList.length >=50 && !selectError) ? false: true}
          >
          {
            (countryList.length >= 50) ?
              countryList.map((curr, index) => <option key={index} value={curr}>{curr}</option>):
              (selectError) ? <option>---</option>: 
              <option value="Loading..">Loading...</option>
          }
          </NativeSelect>
        </div>
      </div>

      <CountryHeader loading={loading} countryFlag={countryFlag} countryName={countryTitle}
        statError= {statError} imgStyle={(countryName !== 'World') ? countryImg : worldImg} />

      <div className="country-info-container">

        {(statError) ? <div  className="stat-error"><div>Something went wrong <Twemoji text=":'(" /></div></div>: null }

        {(countryData && !loading) ? countryData.map((curr, idx) => <Statusblock key={idx + 1} packet={curr} />) : 
         (loading) ? <StatLoader />: null }

        {
          (!statError) ?
          <div className="chart-container">
            { (pieData && !loading) ? <Pie data={pieData} width={420} height={420} legend={pieLegendOpts} options={pieSizeOpts} /> : 
              <div className='chart-loader'><ReactLoading type={'bars'} color={'black'} height={'70px'} width={'70px'} /></div> }
          </div>: null
        } 

      </div>

    
      <TimelineHeader graphError={graphError} noHistory={noHistory} viewChange={viewTypeChange} daysChange={daysAmntChange} daysSelect={daysSelect} viewsSelect={viewsSelect} />

      <div className="graph-section">
        <div className="graph-container">
          {(countryWeekCases && countryData && countryList.length !== 0) ?
            renderViewType(countryWeekCases) : 
            (graphError) ? <div className='graph-error'>Something went wrong <Twemoji text=":'(" /></div>: null }
        </div>

      </div>
    </>
  )
}

export default App;
