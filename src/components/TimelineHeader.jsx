import React from 'react'
import SelectComp from './SelectComp'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'

const customStyles = makeStyles({
	root:{
		left: '11em',
		bottom: '0.55em',
		width: '3em',
		height: '65%',
		position: 'absolute',
		marginLeft: '.15em',
		marginBottom: '.45em'
	},

	imgIcon: {
		width: '100%',
		height: '100%'
	}
})

function TimelineHeader(props) {
	const classes = customStyles()
	return (
		<div id="timeline-header">
			<div className="timeline-content" id="timeline-title">
				COVID-19 Timeline
			</div>
			<Icon component='div' className={classes.root} ><img className={classes.imgIcon} src="https://image.flaticon.com/icons/png/512/554/554717.png"/></Icon>
			<div className="timeline-content" id="timeline-select">
				<div className="time-select-container">
					<SelectComp graphError={props.graphError} noHistory={props.noHistory} tHeaderName="Days" content={['7 days', '14 days', '20 days', '30 days']} changefunc={props.daysChange} optVal={props.daysSelect} />
					<SelectComp graphError={props.graphError} noHistory={props.noHistory} tHeaderName="View as" content={['Line', 'Vertical Bar', 'Horizontal Bar']} changefunc={props.viewChange} optVal={props.viewsSelect} />
				</div>
			</div>
		</div>
	)
}

export default TimelineHeader 