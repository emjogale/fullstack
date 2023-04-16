const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
	{
		title: "blog 1",
		author: "me",
		url: "url1",
		likes: 1,
	},
	{
		title: "blog 2",
		author: "me again",
		url: "url2",
		likes: 0,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
});

test("there is an id property", async () => {
	const response = await api.get("/api/blogs");
	const firstId = response.body[0].id;

	expect(firstId).toBeDefined();
});

test("a valid blog can be added", async () => {
	const newBlog = {
		title: "blog 3",
		author: "clood",
		url: "url3",
		likes: 17,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");
	const titles = response.body.map((r) => r.title);

	expect(response.body).toHaveLength(initialBlogs.length + 1);
	expect(titles).toContain("blog 3");
});

afterAll(async () => {
	await mongoose.connection.close();
});
