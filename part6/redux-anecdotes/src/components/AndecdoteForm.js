import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  <h2>create new</h2>;
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(createAnecdote(content));
    dispatch(setNotification(`you added ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
    //TODO add set timeout for notification
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
