import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'This is a notification',
  reducers: {
    createNotification(state, action) {
      const notice = action.payload;
      return notice ? notice : state;
    },
  },
});

export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
