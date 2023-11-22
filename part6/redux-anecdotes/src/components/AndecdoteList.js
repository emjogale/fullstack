import { useSelector, useDispatch } from 'react-redux';
import { updateVotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes;
    } else {
      return filter !== ''
        ? anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
          )
        : anecdotes;
    }
  });
  const vote = (id) => {
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    const message = votedAnecdote.content;
    dispatch(updateVotes(id));
    dispatch(setNotification(`you voted ${message}`, 5));
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
