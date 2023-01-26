import { useState, useEffect } from "react";
import personService from "./services/persons";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notificationMessage, setNotificationMessage] = useState(null);

	const hook = () => {
		personService.getAll().then((initialPeople) => {
			setPersons(initialPeople);
		});
	};

	useEffect(hook, []);

	// TODO : refactor to extract notofication function to avoid repetition?

	const removeNotification = () => {
		setTimeout(() => {
			setNotificationMessage(null);
		}, 5000);
	};

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
				setNotificationMessage(`Updated number for ${newName}`);
				removeNotification();
				setNewName("");
				setNewNumber("");
			}
		} else {
			personService.create(personObject).then((response) => {
				setPersons(persons.concat(response));
			});
			setNotificationMessage(`Added ${newName}`);
			removeNotification();
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
				.then(setPersons(persons.filter((p) => p.id !== person.id)))
				.catch(() => {
					setNotificationMessage(
						`'${person.name}' has already been deleted from the server`
					);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>

			<Notification message={notificationMessage} />

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
