const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :json")
);
app.use(express.json());

morgan.token("json", function (req, res) {
	const newPerson = JSON.stringify(req.body);
	return newPerson;
});

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const generateId = () => {
	return Math.floor(Math.random() * 1000000);
};

app.get("/api/persons", (request, response) => {
	response.json(persons);
	console.log(persons.map((p) => p.name));
});

app.get("/api/info", (request, response) => {
	const date = new Date(Date.now());
	response.send(
		`<p>Phonebook has info for ${persons.length} people</p> <p>${date}<p>`
	);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	console.log(JSON.stringify(request.body));
	const body = request.body;
	if (!body.name) {
		return response.status(400).json({ error: "name missing" });
	} else if (!body.number) {
		return response.status(400).json({ error: "number missing" });
	} else if (
		persons.find((p) => p.name.toLowerCase() === body.name.toLowerCase())
	) {
		return response.status(400).json({ error: "name must be unique" });
	}
	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
