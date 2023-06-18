import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({
		title: "",
		author: "",
		url: "",
		user: "",
	});

	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		});
		setNewBlog({
			title: "",
			author: "",
			url: "",
		});
	};

	return (
		<div>
			<form onSubmit={addBlog}>
				<div>
					<label>
						title:
						<input
							type="text"
							name="title"
							value={newBlog.title}
							onChange={(event) =>
								setNewBlog({
									...newBlog,
									[event.target.name]: event.target.value,
								})
							}
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
							onChange={(event) =>
								setNewBlog({
									...newBlog,
									[event.target.name]: event.target.value,
								})
							}
						/>
					</label>
				</div>
				<div>
					<label>
						url:
						<input
							name="url"
							value={newBlog.url}
							onChange={(event) =>
								setNewBlog({
									...newBlog,
									[event.target.name]: event.target.value,
								})
							}
						/>
					</label>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default BlogForm;
