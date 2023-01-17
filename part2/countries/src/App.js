import { useState, useEffect } from "react";

import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
	const [filter, setFilter] = useState("");
	const [countries, setCountries] = useState([]);
	const [weather, setWeather] = useState({});

	const filteredList = countries.filter((country) => {
		return new RegExp(filter, "i").test(country.name.common);
	});

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const handleClick = (event) => {
		setFilter(event.target.value);
	};

	const getCountries = () => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	};

	useEffect(getCountries, []);

	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY;
		const filteredList = countries.filter((country) => {
			return new RegExp(filter, "i").test(country.name.common);
		});
		if (filteredList.length === 1) {
			const country = filteredList[0];
			const capital = country.capital;
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
				)
				.then((response) => {
					setWeather(response.data);
				});
		}
	}, [countries, filter]);

	return (
		<div>
			<Filter onChange={handleFilterChange} filter={filter} />
			{filteredList.length !== 1 ? (
				<Countries filteredList={filteredList} handleClick={handleClick} />
			) : (
				<Country country={filteredList[0]} weather={weather} />
			)}
		</div>
	);
};

export default App;
