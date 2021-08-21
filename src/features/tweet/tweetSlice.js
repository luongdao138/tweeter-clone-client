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

const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    fetch_request: (state) => {
      state.loading = true;
    },
    fetch_fulfilled: (state, { payload }) => {
      state.list = payload.list;
      if (state.pagination) {
        state.pagination = payload.pagination;
      }
      state.loading = false;
    },
    fetch_more: (state, { payload }) => {
      state.list = [...state.list, ...payload.list];
      if (state.pagination) {
        state.pagination = payload.pagination;
      }
      state.loading = false;
    },
    add: (state, { payload }) => {
      state.list.unshift(payload);
    },
    like: (state, { payload }) => {
      console.log(payload);
      let tweet = state.list.find((x) => x._id === payload);
      tweet.isLoggedInUserLiked = !tweet.isLoggedInUserLiked;
      if (tweet.isLoggedInUserLiked) {
        tweet.liked_count++;
      } else {
        tweet.liked_count--;
      }
    },
    retweet: (state, { payload }) => {
      console.log(payload);
      let tweet = state.list.find((x) => x._id === payload);
      tweet.isLoggedInUserRetweeted = !tweet.isLoggedInUserRetweeted;
      if (tweet.isLoggedInUserRetweeted) {
        tweet.retweet_count++;
      } else {
        tweet.retweet_count--;
      }
    },
    save: (state, { payload }) => {
      console.log(payload);
      let tweet = state.list.find((x) => x._id === payload);
      tweet.isLoggedInUserSaved = !tweet.isLoggedInUserSaved;
      if (tweet.isLoggedInUserSaved) {
        tweet.saved_count++;
      } else {
        tweet.saved_count--;
      }
    },
    comment: (state, { payload }) => {
      let tweet = state.list.find((x) => x._id === payload);
      tweet.comment_count++;
    },
    reset: (state) => {
      state.loading = true;
    },
  },

  extraReducers: {
    logout: (state) => {
      state.list = [];
    },
  },
});

export const {
  fetch_fulfilled,
  fetch_request,
  fetch_more,
  add,
  like,
  retweet,
  save,
  reset,
  comment,
} = tweetSlice.actions;
export default tweetSlice.reducer;
