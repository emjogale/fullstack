const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const Blog = require("../models/blog");

beforeEach(async () => {
	// delete any blogs and then just add the helper initial blogs
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

// the tests below require us to log a user in
describe("user logs in and addition of a new blog", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		// add emma to users
		const passwordHash = await bcrypt.hash("sekret", 10);
		const newUser = new User({ username: "emma", passwordHash });

		await newUser.save();
	});

	test("succeeds with valid data", async () => {
		// emma logs in and gets token
		const emma = { username: "emma", password: "sekret" };

		const loginResponse = await api.post("/api/login").send(emma);
		const token = loginResponse.body.token;

		const newBlog = {
			title: "blog 3",
			author: "emma",
			url: "url3",
			likes: 17,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: `Bearer ${token}` })
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");
		const titles = response.body.map((r) => r.title);

		expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
		expect(titles).toContain("blog 3");
	});

	test("fails with status 401 if token is not provided", async () => {
		// emma doesn't log in and get token
		const newBlog = {
			title: "blog 3",
			author: "emma",
			url: "url3",
			likes: 17,
		};

		const response = await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(401)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toContain("jwt must be provided");
	});

	test("if the likes property is missing it defaults to  0", async () => {
		// emma logs in and gets token
		const emma = { username: "emma", password: "sekret" };
		const loginResponse = await api.post("/api/login").send(emma);
		const token = loginResponse.body.token;

		const newBlog = {
			title: "blog 3",
			author: "emma",
			url: "url3",
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: `Bearer ${token}` })
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const likes = blogsAtEnd.map((r) => r.likes);

		expect(likes[blogsAtEnd.length - 1]).toEqual(0);
	});

	test("fails with a status code 400 if the title or url properties are missing from the requestd data", async () => {
		// emma logs in and gets token
		const emma = { username: "emma", password: "sekret" };
		const loginResponse = await api.post("/api/login").send(emma);
		const token = loginResponse.body.token;

		const newBlog = {
			title: "",
			author: "emma",

			likes: 17,
		};

		const response = await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: `Bearer ${token}` })
			.expect(400);

		expect(response.body.error).toContain("title or url is missing");
	});
});

describe("deletion of a blog", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		// add emma to users
		const passwordHash = await bcrypt.hash("sekret", 10);
		const newUser = new User({ username: "emma", passwordHash });

		await newUser.save();
	});

	test("succeeds with a status code 204 if id is valid and user is the author", async () => {
		// emma logs in and gets token
		const emma = { username: "emma", password: "sekret" };
		const loginResponse = await api.post("/api/login").send(emma);
		const token = loginResponse.body.token;

		const newBlog = {
			title: "blog 3",
			author: "emma",
			url: "url3",
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set({ Authorization: `Bearer ${token}` });

		const response = await api.get("/api/blogs");
		const newBlogs = response.body;
		// console.log("newBlogs are", newBlogs);

		expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1);

		const blogToDelete = newBlogs[newBlogs.length - 1];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ Authorization: `Bearer ${token}` })
			.expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

		const titles = blogsAtEnd.map((r) => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

// TODO tests above here need user login validation

describe("updating bloglikes", () => {
	test("adding a vote increases its likes by 1", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[1];

		const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

		await api.put(`/api/blogs/${blogToUpdate.id}`).expect(201);

		expect(updatedBlog.likes - blogToUpdate.likes).toBe(1);
	});
});

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sekret", 10);
		const user = new User({ username: "root", passwordHash });

		await user.save();
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "emma",
			name: "Mrs Clod",
			password: "secret",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test("creation fails with a duplicate username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "root",
			name: "Mrs Clod",
			password: "anothersecret",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("expected `username` to be unique");

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test("creation fails with a username less than 3 characters long", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "cl",
			name: "Mrs Clod",
			password: "anothersecret",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain(
			`shorter than the minimum allowed length (3)`
		);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test("creation fails with a password less than 3 characters long", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "clod",
			name: "Mrs Clod",
			password: "s",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("invalid password");

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
