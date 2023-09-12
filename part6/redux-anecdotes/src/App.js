import AnecdoteForm from './components/AndecdoteForm';
import AnecdoteList from './components/AndecdoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
