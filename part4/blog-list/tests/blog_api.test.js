const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

// TODO sort out a better way of saving multiple objects to the database

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("there are six blogs", async () => {
	const response = await api.get("/api/blogs");
	console.log(response.body.map((r) => r.title));
	expect(response.body).toHaveLength(helper.initialBlogs.length);
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

	expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
	expect(titles).toContain("blog 3");
});
test("if the likes property is missing from a new blog it defaults to  0", async () => {
	const newBlog = {
		title: "blog 3",
		author: "clood",
		url: "url3",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

	const likes = blogsAtEnd.map((r) => r.likes);
	console.log(likes);

	expect(likes[blogsAtEnd.length - 1]).toEqual(0);
});

afterAll(async () => {
	await mongoose.connection.close();
});
