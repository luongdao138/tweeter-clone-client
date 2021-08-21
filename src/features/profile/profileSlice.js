import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  detail: {},
  loading: true,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    fulfilled: (state, { payload }) => {
      state.detail = payload.detail;
      state.loading = false;
    },
    follow: (state) => {
      state.detail.isFollow = !state.detail.isFollow;
    },
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {},
});

export const { request, fulfilled, follow, reset } = profileSlice.actions;
export default profileSlice.reducer;
