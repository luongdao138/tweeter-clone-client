import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login_fulfilled: (state, { payload }) => {
      state.user = payload;
    },
    update: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = {};
      localStorage.removeItem('tweeter_token');
      window.location = 'https://tender-banach-9ccbfb.netlify.app/login';
      // window.location = 'http://localhost:3000/login';
    },
  },
  extraReducers: {},
});

export const { login_fulfilled, logout, update } = authSlice.actions;
export default authSlice.reducer;
