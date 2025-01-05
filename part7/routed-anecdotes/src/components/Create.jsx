import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
const CreateNew = (props) => {
	const content = useField('text');
	const author = useField('text');
	const info = useField('text');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.field.value,
			author: author.field.value,
			info: info.field.value,
			votes: 0
		});

		navigate('/');
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content.field} />
				</div>
				<div>
					author
					<input {...author.field} />
				</div>
				<div>
					url for more info
					<input {...info.field} />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default CreateNew;
