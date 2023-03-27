const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const Blog = require("./models/blog");

const errorHandler = (error, request, response, next) => {
	console.log(error.message);
	if (error.name === "CastError") {
		return response.status(400).send({
			error: "malformatted id",
		});
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}
	next(error);
};

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
};

const app = express();

app.use(express.json());
app.use(cors());

morgan.token("body", (request) => {
	return JSON.stringify(request.body);
});

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(requestLogger);

app.get("/info", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.send(
			`<p>Blog list has ${blogs.length} blogs on it<br>${new Date()}</p>`
		);
	});
});

app.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

//TODO is there sometimes a delay with mongodb which causes the id numbers to be different to the localhost ??
app.get("/api/blogs/:id", (request, response, next) => {
	Blog.findById(request.params.id)
		.then((blog) => {
			response.json(blog);
		})
		.catch((error) => next(error));
});

app.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	blog
		.save()
		.then((result) => {
			response.status(201).json(result);
		})
		.catch((error) => next(error));
});

app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
