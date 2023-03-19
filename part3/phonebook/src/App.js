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
	const [status, setStatus] = useState(null);

	const hook = () => {
		personService.getAll().then((initialPeople) => {
			setPersons(initialPeople);
		});
	};

	useEffect(hook, []);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
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
				setStatus("success");
				setTimeout(() => {
					setNotificationMessage(null);
					setStatus(null);
				}, 3000);
				setNewName("");
				setNewNumber("");
			}
		} else {
			personService
				.create(personObject)
				.then((response) => {
					setPersons(persons.concat(response));
				})
				.catch((error) => {
					console.log(error.response.data.error);
					setNotificationMessage(error.response.data.error);
				});
			setNewName("");
			setNewNumber("");
			setStatus("success");
			setNotificationMessage(`Added ${newName}`);
			setTimeout(() => {
				setNotificationMessage(null);
				setStatus(null);
			}, 3000);
		}
	};

	const handleDeleteOf = (person) => {
		const yes = window.confirm(`Delete ${person.name} ?`);
		if (yes) {
			personService
				.deleteItem(person.id)
				.then(setPersons(persons.filter((p) => p.id !== person.id)))
				.catch((error) => {
					setNotificationMessage(
						`'${person.name}' was already removed from server`
					);
					setStatus("error");
					setTimeout(() => {
						setNotificationMessage(null);
						setStatus(null);
					}, 3000);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>

			<Notification message={notificationMessage} status={status} />

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
