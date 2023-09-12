import { useSelector, useDispatch } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);
  const vote = (id) => {
    console.log('we are voting for', id);
    dispatch(addVote(id));
  };

  const votesSortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {votesSortedAnecdotes.map((anecdote) => (
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
