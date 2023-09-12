import { useSelector, useDispatch } from 'react-redux';
import { addVote } from './reducers/anecdoteReducer';
import NewAnecdote from './components/AndecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('we are voting for', id);
    dispatch(addVote(id));
  };

  const votesSortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {votesSortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  );
};

export default App;
