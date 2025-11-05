import { createSlice } from '@reduxjs/toolkit';

export const reportSlice = createSlice({
  name: 'report',
  initialState: {
    data: {
      show: false
    }
  },
  reducers: {
    generate: (state) => {
      state.data = {
        show: true
      };
    }
  }
})

export const { generate } = reportSlice.actions;

export const data = (state) => state.report.data;

export default reportSlice.reducer;
