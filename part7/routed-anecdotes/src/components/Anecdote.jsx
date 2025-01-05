import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
	const id = useParams().id;

	const anecdote = anecdotes.find((a) => a.id === Number(id));
	console.log('anecdote is', anecdote);
	return (
		<div>
			<h2>
				{anecdote.content} by {anecdote.author}
			</h2>
			<p>has {anecdote.votes} votes</p>
			<p>
				for more info see <a href="#">{anecdote.info}</a>
			</p>
		</div>
	);
};

export default Anecdote;
