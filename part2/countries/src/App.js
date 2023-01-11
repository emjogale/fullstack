import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";
import Filter from "./components/Filter";

const App = () => {
	const [filter, setFilter] = useState("");
	const [countries, setCountries] = useState([]);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const hook = () => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	};

	useEffect(hook, []);

	return (
		<div>
			<Filter onChange={handleFilterChange} filter={filter} />
			<Countries countries={countries} filter={filter} setFilter={setFilter} />
		</div>
	);
};

export default App;
