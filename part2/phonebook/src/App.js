import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const hook = () => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	};

	useEffect(hook, []);

	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			number: newNumber,
		};

		persons.map((person) => person.name).includes(newName)
			? alert(`${newName} already in phonebook`)
			: personService.create(personObject).then((response) => {
					setPersons(persons.concat(response.data));
			  });
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
	};

	const handleDeleteOf = (person) => {
		const yes = window.confirm(`Delete ${person.name} ?`);
		if (yes) {
			personService
				.deleteItem(person.id)
				.then(setPersons(persons.filter((p) => p.id !== person.id)));
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter onChange={handleFilterChange} filter={filter} />

			<h3>Add a new</h3>

			<PersonForm
				onSubmit={addPerson}
				onNameChange={handleNameChange}
				onNumberChange={handleNumberChange}
				newName={newName}
				newNumber={newNumber}
			/>

			<h3>Numbers</h3>

			<Persons
				persons={persons}
				filter={filter}
				handleDelete={handleDeleteOf}
			/>
		</div>
	);
};

export default App;
