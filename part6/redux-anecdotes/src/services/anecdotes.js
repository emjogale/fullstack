import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (id) => {
  const anecdotes = await axios.get(baseUrl);
  const anecdoteToUpdate = anecdotes.data.find((a) => a.id === id);
  console.log('anecdote to update is', anecdoteToUpdate);
  anecdoteToUpdate.votes += 1;
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate);
  return response.data;
};

// eslint-disable-next-line
export default { getAll, createNew, update };
