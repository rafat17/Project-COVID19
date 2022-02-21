export const getCountryNames = async () => {
	const getCountryNamesResponse = await fetch('https://disease.sh/v3/covid-19/countries')
	const getCountryNamesJson = await getCountryNamesResponse.json()
	return getCountryNamesJson
}


export const getWorldWideCovidData = async () => {
	const getGlobalCovidData = await fetch('https://disease.sh/v3/covid-19/all')
	const getGlobalCovidDataJson = await getGlobalCovidData.json()
	return getGlobalCovidDataJson
}


export async function getCountryCovidData(countryName) {
	const response = await fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`)
	return await response.json()
}


export async function getLastWeekDataOfWorld() {
	const response = await fetch('https://disease.sh/v3/covid-19/historical/all')
	return await response.json()
}


export async function getLastWeekDataByCountry(countryName) {
	const response = await fetch(`https://disease.sh/v3/covid-19/historical/${countryName}`)
	return await response.json()
	// return await track.historical(null, countryName)
}

