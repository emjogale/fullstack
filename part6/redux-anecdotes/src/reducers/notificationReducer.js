import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const id = action.payload;
      return id ? id : state;
    },
    removeNotification(state, action) {
      return (state = '');
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
