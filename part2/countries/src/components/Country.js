import Weather from "./Weather";
const Country = ({ country, weather }) => {
	const languages = Object.values(country.languages);
	const flag = country.flags.png;

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>

			<h2>languages:</h2>
			<ul>
				{languages.map((language) => (
					<li key={language}> {language}</li>
				))}
			</ul>

			<div>
				<img src={flag} alt="flag"></img>
			</div>

			<Weather country={country} weather={weather} />
		</div>
	);
};

export default Country;
