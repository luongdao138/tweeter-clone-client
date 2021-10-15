import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import commentSlice from '../features/comment/commentSlice';
import counterReducer from '../features/counter/counterSlice';
import notificationSlice from '../features/notification/notificationSlice';
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
    notification: notificationSlice,
  },
  devTools:
    process.env.NODE_ENV === 'development' && typeof window !== 'undefined',
});
