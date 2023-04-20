const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe("when there are initially some blogs saved", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("all blogs are returned", async () => {
		const response = await api.get("/api/blogs");

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test("the blogs have an id property", async () => {
		const response = await api.get("/api/blogs");
		const firstId = response.body[0].id;

		expect(firstId).toBeDefined();
	});
});

describe("addition of a new blog", () => {
	test("succeeds with valid data", async () => {
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

	test("if the likes property is missing it defaults to  0", async () => {
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

		expect(likes[blogsAtEnd.length - 1]).toEqual(0);
	});

	test("fails with a status code 400 if the title or url properties are missing from the requestd data", async () => {
		const newBlog = {
			title: "",
			author: "clood",

			likes: 17,
		};

		const response = await api.post("/api/blogs").send(newBlog);

		expect(response.status).toBe(400);
	});
});

describe("deletion of a blog", () => {
	test("succeeds with a status code 204 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];
		console.log("blog to delete", blogToDelete);

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const titles = blogsAtEnd.map((r) => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
