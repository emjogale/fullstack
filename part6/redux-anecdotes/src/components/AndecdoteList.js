import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer';

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
    console.log('we are voting for', id);
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    const message = votedAnecdote.content;
    dispatch(addVote(id));
    dispatch(setNotification(`you voted ${message}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
