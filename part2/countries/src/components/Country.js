const Country = ({ country }) => {
	const languages = Object.values(country.languages);
	const flag = country.flags.png;
	return (
		<div>
			<h2>{country.name.common}</h2>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>

			<h3>languages:</h3>
			<ul>
				{languages.map((language) => (
					<li key={language}> {language}</li>
				))}
			</ul>
			<div>
				<img src={flag} alt="flag"></img>
			</div>
		</div>
	);
};

export default Country;
