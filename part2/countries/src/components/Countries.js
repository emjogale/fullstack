import React from "react";

const Countries = ({ filteredList, handleClick }) => {
	if (filteredList.length <= 10) {
		return (
			<div>
				{filteredList.map((country) => (
					<div key={country.name.common}>
						{country.name.common}
						<button value={country.name.common} onClick={handleClick}>
							show
						</button>
					</div>
				))}
			</div>
		);
	} else {
		return <div>Too many matches, specify another filter</div>;
	}
};
export default Countries;

// TODO: work out the onClick function of the button which then shows the details of that specific country
