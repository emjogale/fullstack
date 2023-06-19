const Blog = ({ blog }) => {
	const blogStyle = {
		padding: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		margin: 5,
		backgroundColor: "lightcyan",
	};
	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
		</div>
	);
};

export default Blog;
