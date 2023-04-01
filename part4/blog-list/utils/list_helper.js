const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const likes = blogs.map((x) => x.likes);
	return likes.length === 0
		? 0
		: likes.reduce((sum, item) => {
				return sum + item;
		  }, 0);
};

//TODO write favouriteBlog function
const favoriteBlog = (blogs) => {
	const likes = blogs.map((blog) => blog.likes);
	let mostLikes = likes.reduce(function (highest, curr) {
		return highest > curr ? highest : curr;
	});
	const result = blogs.find((x) => x.likes === mostLikes);
	const result_obj = {
		title: result.title,
		author: result.author,
		likes: result.likes,
	};
	return result_obj;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
