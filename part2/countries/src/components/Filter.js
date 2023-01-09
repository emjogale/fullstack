const Filter = ({ onChange, filter }) => {
	return (
		<div>
			find countries: <input value={filter} onChange={onChange} />
		</div>
	);
};

export default Filter;
