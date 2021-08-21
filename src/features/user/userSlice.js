import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  pagination: {
    skip: 0,
    limit: 15,
    total_results: 1,
  },
};

const userSlice = createSlice({
  name: 'users',
  reducers: {
    fetch_request: (state) => {
      state.loading = true;
    },
    fetch_fulfilled: (state, { payload }) => {
      state.list = payload.list;
      if (payload.pagination) {
        state.pagination = payload.pagination;
      }
      state.loading = false;
    },
    fetch_more: (state, { payload }) => {
      state.list = [...state.list, ...payload.list];
      if (payload.pagination) {
        state.pagination = payload.pagination;
      }
      state.loading = false;
    },
    follow: (state, { payload }) => {
      const user = state.list.find((x) => x._id === payload);
      user.isFollow = !user.isFollow;
      if (user.isFollow) {
        user.followers_count++;
      } else {
        user.followers_count--;
      }
    },
    online: (state, { payload }) => {
      state.list.forEach((u) => {
        if (u._id === payload) {
          u.is_online = true;
        }
      });
    },
    reset: (state) => {
      state.loading = true;
    },
  },
  initialState,
  extraReducers: {},
});

export const {
  fetch_fulfilled,
  fetch_request,
  fetch_more,
  reset,
  follow,
  online,
} = userSlice.actions;
export default userSlice.reducer;
