const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

//TODO add in env variable of database url and replace this
const url = process.env.MONGODB_URI;

// const mongoUrl = "mongodb://localhost/bloglist";
mongoose
	.connect(url)
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
};

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

//TODO sort out the get by id function: should the id locally be the same as in the mongodb??
app.get("/api/blogs/:id", (request, response, next) => {
	Blog.findById(request.params.id)
		.then((blog) => {
			response.json(blog);
		})
		.catch((error) => console.log(error));
});

app.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
