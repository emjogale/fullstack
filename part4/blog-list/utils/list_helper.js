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

module.exports = {
	dummy,
	totalLikes,
};
