//default error state objects
export const defaultErrors = {
	selectError: false, 
	statError: false, 
	graphError: false
}


export const worldImg = {
  position: 'absolute',
  width: '35px',
  height: '32px'
}


export const countryImg = {
  position: 'absolute',
  marginTop: '2px',
  marginLeft: '5px',
  width: '46px',
  height: '28px',
  boxShadow: '3px 2px 5px 2px #ccc'
}


export const colourSets = {
	c1: '#4040a1',
	c2: '#f65314',
	c3: '#e50914',
	c4: '#3dad33',
	c5: '#0000cc',
	c6: '#fc0300',
	c7: '#9e0d0a',
	c8: '#ff0052'
}


export const pieSizeOpts = {
	maintainAspectRatio: false,
	responsive: false  
}


export const pieLegendOpts = {
	position: 'top',
	labels: {
	  fontSize: 14.75,
	  fontColor: 'black',
	  boxWidth: 25,
	  padding: 25
	}
}


//styles for the visual types

export const globalLegendOpts = {
	fill: true,
	position: 'top',
	labels: {
	  fontSize: 14,
	  fontColor: 'black',
	  boxWidth: 15,
	  padding: 15
	}
  }

// export const radarOpts = {
// 	maintainAspectRatio: false,
// 	// responsive: true,
// 	scale: {
// 	  gridLines: {
// 		lineWidth: 1.5
// 	  },
// 	  pointLabels: {
// 		fontSize: 15,
// 		fontColor: '#480000',
// 		fontFamily: "'sans-serif'",
// 		fontStyle: 'italic'
// 	  },
// 	  ticks: {
// 		beginAtZero: true
// 	  }
// 	}
//   }

export const lineOpts = {

	maintainAspectRatio: false,
	// responsive: true,
	scales: {
	  xAxes: [{
		gridLines: {
		  // drawOnChartArea: false,
		  zeroLineWidth: 1.5,
		  lineWidth: 1,
		  drawBorder: false,
		  color: '#c0c0c0',
		  tickMarkLength: 7
		},

		ticks: {
		  padding: 10,
		  fontColor: '#480000',
		  fontSize: 14.75,
		  fontFamily: "'sans-serif'",
		  fontStyle: 'italic'
		}
	  }],

	  yAxes: [{
		gridLines: {
		  zeroLineWidth: 1.5,
		  lineWidth: .75,
		  drawTicks: false,
		  drawBorder: true,
		  color: '#c0c0c0',
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

