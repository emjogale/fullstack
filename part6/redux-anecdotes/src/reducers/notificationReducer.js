import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      console.log('action.payload is', action.payload);
      const message = action.payload;
      console.log('message is', message);
      return message ? message : state;
    },
    removeNotification(state, action) {
      return '';
    },
  },
});

export const setNotification = (message, duration) => {
  const secs = duration * 1000;
  return async (dispatch) => {
    dispatch(addNotification(message));
    setTimeout(() => dispatch(removeNotification()), secs);
  };
};

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
