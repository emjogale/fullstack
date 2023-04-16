const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/info", async (request, response) => {
	const blogs = await Blog.find({});
	response.send(
		`<p>Blog list has ${blogs.length} blogs on it<br>${new Date()}</p>`
	);
});

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.get("/:id", (request, response, next) => {
	Blog.findById(request.params.id)
		.then((blog) => {
			response.json(blog);
		})
		.catch((error) => next(error));
});

blogRouter.post("/", (request, response) => {
	const blog = new Blog(request.body);

	blog
		.save()
		.then((savedBlog) => {
			response.status(201).json(savedBlog);
		})
		.catch((error) => next(error));
});

blogRouter.delete("/:id", (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

blogRouter.put("./:id", (request, response, next) => {
	const blog = new Blog(request.body);
	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then((updatedBlog) => {
			response.json(updatedBlog);
		})
		.catch((error) => next(error));
});

module.exports = blogRouter;
