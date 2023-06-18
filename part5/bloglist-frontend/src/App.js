import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const [popupMessage, setPopupMessage] = useState({
		message: null,
		type: "success",
	});
	const [newBlogVisible, setnewBlogVisible] = useState(false);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	// this was used to debug the logged in user issue
	// useEffect(() => {
	// 	console.log("current user:", user);
	// }, [user]);

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

	const loginForm = () => {
		return (
			<div>
				<h2>log in to application</h2>

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
	};

	const blogForm = () => {
		const hideWhenVisible = { display: newBlogVisible ? "none" : "" };
		const showWhenVisible = { display: newBlogVisible ? "" : "none" };
		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setnewBlogVisible(true)}>add new blog</button>
				</div>
				<div style={showWhenVisible}>
					<h2>create new</h2>
					<BlogForm createBlog={addBlog} />

					<button onClick={() => setnewBlogVisible(false)}>cancel</button>
				</div>
			</div>
		);
	};

	const addBlog = async (blogObject) => {
		try {
			await blogService.create(blogObject);

			popUp(
				`a new blog ${blogObject.title} by ${blogObject.author} was added by`,
				user
			);

			setnewBlogVisible(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>blogs</h2>
			<Notification popupMessage={popupMessage} />
			{user && (
				<p>
					{user.name} is logged in
					<button onClick={handleLogout}>logout</button>
				</p>
			)}
			{user === null ? loginForm() : blogForm()}

			<div>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		</div>
	);
};

export default App;
