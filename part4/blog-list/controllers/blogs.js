const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/info", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.send(
			`<p>Blog list has ${blogs.length} blogs on it<br>${new Date()}</p>`
		);
	});
});

blogRouter.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogRouter.get("/api/blogs/:id", (request, response, next) => {
	Blog.findById(request.params.id)
		.then((blog) => {
			response.json(blog);
		})
		.catch((error) => next(error));
});

blogRouter.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	blog
		.save()
		.then((result) => {
			response.status(201).json(result);
		})
		.catch((error) => next(error));
});

module.exports = blogRouter;
