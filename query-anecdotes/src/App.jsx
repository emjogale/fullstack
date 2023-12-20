import { useQuery, useMutation } from '@tanstack/react-query';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Errorpage from './components/Errorpage';
import { getAnecdotes, updateAnecdote } from './services/requests';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const updatedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const dispatch = useNotificationDispatch();

  if (result.isPending) {
    return <div>is loading...</div>;
  }

  if (result.isError) {
    return (
      <div>
        <Errorpage />
      </div>
    );
  }

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({
      ...anecdote,
      votes: (anecdote.votes += 1),
    });
    dispatch({
      type: 'setNotification',
      payload: `you voted ${anecdote.content}`,
    });
  };

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
