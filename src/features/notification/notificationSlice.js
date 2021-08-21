import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  pagination: {
    skip: 0,
    limit: 10,
    total_results: 1,
  },
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetch_request: (state) => {
      state.loading = true;
    },
    add_nof: (state, { payload }) => {
      state.list.unshift(payload);
      state.pagination.total_results++;
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
  },
  extraReducers: {},
});

export const { add_nof, fetch_fulfilled, fetch_request, fetch_more } =
  notificationSlice.actions;
export default notificationSlice.reducer;
