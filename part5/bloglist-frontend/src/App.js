import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [newBlog, setNewBlog] = useState({
		title: "",
		author: "",
		url: "",
		user: "",
	});
	const [popupMessage, setPopupMessage] = useState({
		message: null,
		type: "success",
	});

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	// this was used to debug the logged in user issue
	// useEffect(() => {
	// 	console.log("current user:", user);
	// }, [user]);

	// notify success in creating a blog or error with logging in
	const popUp = (message, type = "success") => {
		setPopupMessage({ message, type });
		setTimeout(() => {
			setPopupMessage({ message: null });
		}, 4000);
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.clear();
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
			setUser(user);
			setUsername("");
			setPassword("");
			// the important bit to allocate the token to the user
			blogService.setToken(user.token);
		} catch (exception) {
			console.log("Wrong credentials");
			popUp("wrong username or password", "error");
		}
	};

	// check if there is a user is logged on and saved in localstorage

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleBlogChange = (event) => {
		setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
	};

	const addBlog = async (event) => {
		event.preventDefault();
		const blogObject = {
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
			user: user.id,
		};
		try {
			await blogService.create(blogObject);

			popUp(
				`a new blog ${blogObject.title} by ${blogObject.author} was added by`,
				user
			);
			setNewBlog({
				title: "",
				author: "",
				url: "",
				user: "",
			});
		} catch (error) {
			console.log(error);
		}
	};
	if (user === null) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification popupMessage={popupMessage} />
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification popupMessage={popupMessage} />
			<p>
				{user.name} is logged in
				<button onClick={handleLogout}>logout</button>
			</p>

			<h2>create new</h2>

			<form onSubmit={addBlog}>
				<div>
					<label>
						title:
						<input
							type="text"
							name="title"
							value={newBlog.title}
							onChange={handleBlogChange}
						/>
					</label>
				</div>

				<div>
					<label>
						author:
						<input
							type="text"
							name="author"
							value={newBlog.author}
							onChange={handleBlogChange}
						/>
					</label>
				</div>

				<div>
					<label>
						url:
						<input name="url" value={newBlog.url} onChange={handleBlogChange} />
					</label>
				</div>
				<button type="submit">create</button>
			</form>
			<div>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		</div>
	);
};

export default App;
