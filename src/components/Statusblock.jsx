import React from 'react'

function Statusblock(props){
	return (
		<div style={props.packet.bottom} className="stat-block" key={props.index}>
			<div className="stat-heading">{props.packet.title}</div>
			<div style={props.packet.style} className="stat-data">{props.packet.data}</div>
	    </div>
	)
}

export default Statusblock;