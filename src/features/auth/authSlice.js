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
    online: (state) => {
      state.user.is_online = true;
    },
    add_nof: (state) => {
      if (state.user.notifications_count) {
        state.user.notifications_count++;
      } else {
        state.user.notifications_count = 1;
      }
    },
    reset_nof: (state) => {
      state.user.notifications_count = 0;
    },
    logout: (state) => {
      state.user = {};
      localStorage.removeItem('tweeter_token');
      window.location =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/login'
          : 'https://tender-banach-9ccbfb.netlify.app/login';
    },
  },
  extraReducers: {},
});

export const { login_fulfilled, logout, update, online, add_nof, reset_nof } =
  authSlice.actions;
export default authSlice.reducer;
