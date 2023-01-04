import { useState } from "react";
import Person from "./components/Person";

const App = () => {
	const [persons, setPersons] = useState([{ name: "" }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

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

	return (
		<div>
			<h2>Phonebook</h2>
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
			<h2>Numbers</h2>
			{persons.map((person) => (
				<Person key={person.name} person={person} />
			))}
		</div>
	);
};

export default App;
