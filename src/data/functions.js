import { colourSets } from './data'

var d3 = require('d3')


//function 1
export function structureCountryData(res) {

  const { cases, active, deaths, recovered, todayCases, todayDeaths, critical, tests } = res
  const { c1, c2, c3, c4, c5, c6, c7, c8 } = colourSets

  const formatCountryData = [
    { title: 'confirmed', style: { color: c1 }, bottom: { borderBottom: `3px solid ${c1}` }, data: cases },
    { title: 'active', style: { color: c2 }, bottom: { borderBottom: `3px solid ${c2}` }, data: active },
    { title: 'deaths', style: { color: c3 }, bottom: { borderBottom: `3px solid ${c3}` }, data: deaths },
    { title: 'recovered', style: { color: c4 }, bottom: { borderBottom: `3px solid ${c4}` }, data: recovered },
    { title: 'confirmed today', style: { color: c5 }, bottom: { borderBottom: `3px solid ${c5}` }, data: todayCases },
    { title: 'deaths today', style: { color: c6 }, bottom: { borderBottom: `3px solid ${c6}` }, data: todayDeaths },
    { title: 'Critical Cases', style: { color: c7 }, bottom: { borderBottom: `3px solid ${c7}` }, data: critical },
    { title: 'Tests performed', style: { color: c8 }, bottom: { borderBottom: `3px solid ${c8}` }, data: tests }
  ]

  return formatCountryData

}


//function 2
export function structurePieData(res) {

  const { cases, deaths, recovered } = res
  const { c1, c3, c4 } = colourSets

  const formatPieData = {

    labels: ['Confirmed', 'Deaths', 'Recovered'],
    datasets: [{
      data: [cases, deaths, recovered],
      backgroundColor: [c1, c3, c4]
    }]
  }

  return formatPieData
}



//function 3
function transformWeeklyData(title, data_arr, colours) {
  return {
    label: title,
    fill: false,
    showLine: true,
    lineTension: 0.2,
    backgroundColor: colours.base,
    borderColor: colours.base,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    borderWidth: 4,
    pointBorderColor: colours.base,
    pointBackgroundColor: colours.base,
    pointBorderWidth: 4,
    pointHoverRadius: 8,
    pointHoverBackgroundColor: colours.base,
    pointHoverBorderColor: colours.base,
    pointHoverBorderWidth: 2,
    pointRadius: .9,
    pointHitRadius: 2,
    data: [...data_arr]
  }
}



//function 4
export function formatWeeklyData(content, indices) {

  const confirmed_data = []
  const deaths_data = []
  const recovered_data = []
  const timestamps = []

  const all_data = {
    labels: [],
    datasets: []
  }

  const { c1, c3, c4, c1_hover, c3_hover, c4_hover } = colourSets


  let parseDate = d3.timeParse("%m/%d/%y")
  let formatDate = d3.timeFormat("%B %d")


  for (let i = 0; i < indices.cases_indices.length; i++) {

    const index = indices.cases_indices[i]

    timestamps.push(formatDate(parseDate(index)))
    confirmed_data.push(content.cases_history[index])
    deaths_data.push(content.deaths_history[index])
    recovered_data.push(content.recovered_history[index])

  }

  all_data.labels.push(...timestamps)

  all_data.datasets.push(
    transformWeeklyData('Confirmed', confirmed_data, { base: c1, hover: c1_hover }),
    transformWeeklyData('Deaths', deaths_data, { base: c3, hover: c3_hover }),
    transformWeeklyData('Recovered', recovered_data, { base: c4, hover: c4_hover })
  )

  return all_data

}


//function 5
export function formatHistoricalData(res, days) {

  const numdays = parseInt(days)

  var history = null

  if (res.timeline !== undefined) {
    history = {
      cases_history: res.timeline.cases,
      deaths_history: res.timeline.deaths,
      recovered_history: res.timeline.recovered
    }
  }

  else {
    history = {
      cases_history: res.cases,
      deaths_history: res.deaths,
      recovered_history: res.recovered
    }
  }

  const history_indices = {
    cases_indices: Object.keys(history.cases_history).slice(-numdays),
    deaths_indices: Object.keys(history.deaths_history).slice(-numdays),
    recovered_indices: Object.keys(history.recovered_history).slice(-numdays)
  }

  return {
    history: history,
    history_indices: history_indices
  }
}

//function 6
export function barStyleGetter(horizontalView){

  return {

    maintainAspectRatio: true,
    // responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
          lineWidth: 2,
          drawBorder: false,
          color: '#c0c0c0',
          tickMarkLength: 12
        },
        ticks: {
          padding: 10,
          fontColor: '#480000',
          fontSize: 15,
          fontFamily: "'sans-serif'",
          fontStyle: 'italic'
        }
      }],

      yAxes: [{
        gridLines: {
          lineWidth: 1,
          drawBorder: horizontalView ? true : false,
          color: '#c0c0c0',
          tickMarkLength: 12
        },
        ticks: {
          padding: 12,
          fontColor: '#480000',
          fontSize: 15,
          fontFamily: 'sans-serif',
          fontStyle: 'italic'
        }
      }]
    }
  }

}