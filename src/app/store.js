import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import commentSlice from '../features/comment/commentSlice';
import counterReducer from '../features/counter/counterSlice';
import profileSlice from '../features/profile/profileSlice';
import tweetSlice from '../features/tweet/tweetSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    tweet: tweetSlice,
    profile: profileSlice,
    user: userSlice,
    comment: commentSlice,
  },
});
