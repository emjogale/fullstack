import { useState } from "react";

import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			id: newName,
			number: newNumber,
		};

		persons.map((person) => person.name).includes(newName)
			? alert(`${newName} already in phonebook`)
			: setPersons(persons.concat(personObject));
		setNewName("");
		setNewNumber("");
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		console.log(filter);
	};

	// const searchName = filter.toLowerCase();
	// const names = persons.map((person) => person.name);
	// const matches = names.filter(
	// 	(name) => name.toLowerCase().indexOf(searchName) !== -1
	// );
	// console.log(matches);

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input onChange={handleFilterChange} value={filter} />
			</div>
			<h3>add a new</h3>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
					<div>
						number: <input value={newNumber} onChange={handleNumberChange} />
					</div>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h3>Numbers</h3>
			<Persons persons={persons} filter={filter} />
		</div>
	);
};

export default App;
