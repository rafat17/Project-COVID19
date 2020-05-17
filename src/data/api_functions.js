import { NovelCovid } from 'novelcovid'

const track = new NovelCovid()


export async function getCountryNames() { 
	return await track.countryNames() 
}


export async function getWorldWideCovidData() {
	return await track.all()
}


export async function getCountryCovidData(countryName) {
	const response = await fetch(`https://corona.lmao.ninja/v2/countries/${countryName}`)
	return await response.json()
}


export async function getLastWeekDataOfWorld() {
	const response = await fetch('https://corona.lmao.ninja/v2/historical/all')
	return await response.json()
}


export async function getLastWeekDataByCountry(countryName) {
	return await track.historical(null, countryName)
}

