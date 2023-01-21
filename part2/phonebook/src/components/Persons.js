import Person from "./Person";

const Persons = ({ persons, filter, handleDelete }) => {
	let list = persons;
	if (filter) {
		list = persons.filter((person) =>
			new RegExp(filter, "i").test(person.name)
		);
	}
	return (
		<div>
			{list.map((person) => (
				<Person
					key={person.name}
					person={person}
					handleDelete={() => handleDelete(person)}
				/>
			))}
		</div>
	);
};

export default Persons;
