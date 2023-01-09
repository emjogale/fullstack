import Country from "./Country";

const Countries = ({ countries, filter }) => {
	let names = countries.map((country) => country.name);
	let list = names.map((x) => x.common);

	let filteredList = list.filter((country) =>
		new RegExp(filter, "i").test(country)
	);

	if (filteredList.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	} else if (filteredList.length === 1) {
		const country = countries[list.indexOf(filteredList[0])];

		return (
			<div>
				<Country country={country} />
			</div>
		);
	} else {
		return (
			<div>
				{filteredList.map((country) => (
					<div key={country}>{country}</div>
				))}
			</div>
		);
	}
};

export default Countries;
