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

blogRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogRouter.post("/", async (request, response) => {
	const body = request.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	});
	if (body.title && body.url) {
		const savedBlog = await blog.save();
		response.status(201).json(savedBlog);
	} else {
		response.status(400).end();
	}
});

blogRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);

	response.status(204).end();
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
