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

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetch_request: (state) => {
      state.loading = true;
    },
    fetch_fulfilled: (state, { payload }) => {
      state.list = payload.list;
      state.pagination = payload.pagination;
      state.loading = false;
    },
    fetch_more: (state, { payload }) => {
      state.list = [...state.list, ...payload.list];
      state.pagination = payload.pagination;
      state.loading = false;
    },
    add: (state, { payload }) => {
      state.list.unshift(payload);
    },
    like: (state, { payload }) => {
      const c = state.list.find((x) => x._id === payload);
      c.isLiked = !c.isLiked;
      if (c.isLiked) {
        c.liked_count++;
      } else {
        c.liked_count--;
      }
    },
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {},
});

export const { fetch_fulfilled, fetch_more, fetch_request, reset, add, like } =
  commentSlice.actions;
export default commentSlice.reducer;
