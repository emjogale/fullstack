import { useState } from "react";

const Blog = ({ blog }) => {
	const [showDetails, setShowDetails] = useState(false);

	const showWhenVisible = {
		display: showDetails ? "" : "none",
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
				<button>like</button>
				<br />
				{blog.user.name}
			</div>
		</div>
	);
};

export default Blog;
