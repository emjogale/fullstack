require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { request, response } = require("express");

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
};

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :json")
);
app.use(express.json());
app.use(express.static("build"));

morgan.token("json", function (req, res) {
	return JSON.stringify(req.body);
});

let persons = [];

const generateId = () => {
	return Math.floor(Math.random() * 1000000);
};

app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

app.get("/api/info", (request, response) => {
	const date = new Date(Date.now());
	response.send(
		`<p>Phonebook has info for ${persons.length} people</p> <p>${date}<p>`
	);
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: "name missing",
		});
	} else if (!body.number) {
		return response.status(400).json({
			error: "number missing",
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

// if a person exists already and need to update number
app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body;
	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then((updatedPerson) => {
			res.json(updatedPerson);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};
// handler for requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.log(error.message);
	if (error.name === "CastError") {
		return response.status(400).send({
			error: "malformatted id",
		});
	}
	next(error);
};

// handler of requests with result errors
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
