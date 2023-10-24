import AnecdoteForm from './components/AndecdoteForm';
import AnecdoteList from './components/AndecdoteList';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
