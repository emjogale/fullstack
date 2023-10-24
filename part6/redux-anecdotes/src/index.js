import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import anecdotereducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  anecdotes: anecdotereducer,
  filter: filterReducer,
});

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));
// TODO Check the bit in the notes example where the getState gets printed to the console to see how we access the filter input. I'm getting invalid hook call so read through the notes example again. I think the problem may be with filter reducer/ filter change??

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
