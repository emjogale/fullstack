import { useState, useEffect } from "react";
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
		personService.getAll().then((initialPeople) => {
			setPersons(initialPeople);
		});
	};

	useEffect(hook, []);

	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			number: newNumber,
		};

		if (persons.map((person) => person.name).includes(newName)) {
			const samePerson = persons.find((person) => person.name === newName);
			const yes = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			if (yes) {
				const changedPerson = { ...samePerson, number: newNumber };
				personService
					.update(samePerson.id, changedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.name !== newName ? person : returnedPerson
							)
						);
					});
				setNewName("");
				setNewNumber("");
			}
		} else {
			personService.create(personObject).then((response) => {
				setPersons(persons.concat(response));
			});
			setNewName("");
			setNewNumber("");
		}
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
