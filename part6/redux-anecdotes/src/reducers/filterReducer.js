import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter(state, action) {
      const filter = action.payload;
      console.log(JSON.parse(JSON.stringify(state)));
      return filter ? filter : state;
    },
  },
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
