import { useState } from "react";

const Blog = ({ blog, addLike }) => {
	const [showDetails, setShowDetails] = useState(false);

	const showWhenVisible = {
		display: showDetails ? "" : "none",
	};

	const handleClick = () => {
		addLike(blog.id, {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: (blog.likes += 1),
			user: blog.user,
		});
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
		backgroundColor: "lightcyan",
	};
	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? "hide" : "view"}
			</button>
			<div style={showWhenVisible}>
				{blog.url}
				<br />
				likes {blog.likes}
				<button onClick={handleClick}>like</button>
				<br />
				{blog.user.name}
			</div>
		</div>
	);
};

export default Blog;
