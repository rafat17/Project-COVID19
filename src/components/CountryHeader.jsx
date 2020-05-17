import React from 'react'
import ReactLoading from 'react-loading'


export const CountryHeader = (props) => {

	function rendercountryTitle(props){
		return props.loading ? <ReactLoading type={'bars'} color={'black'} height={50} width={50} />:
		(!props.statError) ? 
		<div>
			<span>{props.countryName}</span>
			<img style={props.imgStyle} src={props.countryFlag} />
		</div>: null 
	}

	return( 
	<div id="country-heading">
		{ rendercountryTitle(props) }
	</div>)
}