const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.get("/info", async (request, response) => {
	const blogs = await Blog.find({});
	response.send(
		`<p>Blog list has ${blogs.length} blogs on it<br>${new Date()}</p>`
	);
});

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
	const body = request.body;
	const user = await User.findById(request.user);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user.id,
	});
	if (body.title && body.url) {
		await blog.populate("user", { name: 1 });
		const savedBlog = await blog.save();

		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		console.log("blog saved by", user.name);
		console.log("saved blog is", savedBlog);
		response.status(201).json(savedBlog);
	} else {
		response.status(400).json({ error: "title or url is missing" }).end();
	}
});

blogRouter.delete(
	"/:id",
	middleware.userExtractor,
	async (request, response) => {
		const blog = await Blog.findById(request.params.id);
		const user = await User.findById(request.user);

		if (blog.user.toString() === user.id.toString()) {
			await Blog.findByIdAndRemove(request.params.id);
			response.status(204).end();
		} else {
			return response.status(401).json({ error: "unauthorized request" });
		}
	}
);

blogRouter.put("/:id", async (request, response) => {
	const body = request.body;
	console.log("request body id ", request.params.id);

	const blog = {
		title: body.title,
		author: body.author,
		likes: body.likes,
	};
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});

	response.status(201).json(updatedBlog);
});

module.exports = blogRouter;
