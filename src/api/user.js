import axiosClient from './axiosClient';

export const getUserLogin = async () => {
  return axiosClient()
    .get('users')
    .then((res) => res.data);
};

export const editUserProfile = async (data) => {
  return axiosClient()
    .patch('/users', data)
    .then((res) => res.data);
};

export const followUser = async (follow_id) => {
  return axiosClient()
    .patch('/users/follow', {
      follow_id,
    })
    .then((res) => res.data);
};

export const getUserProfile = async (user_id) => {
  return axiosClient()
    .get(`/users/${user_id}`)
    .then((res) => res.data);
};
export const searchUser = async (params) => {
  return axiosClient()
    .get('/users/search', {
      params,
    })
    .then((res) => res.data);
};

export const getUserFollow = async (user_id, params) => {
  return axiosClient()
    .get(`/users/follow/${user_id}`, {
      params,
    })
    .then((res) => res.data);
};

export const getRecommendFollowing = async () => {
  return axiosClient()
    .get('/users/recommendFollow')
    .then((res) => res.data);
};

export const getTweetActionUsers = async (tweet_id, params) => {
  return axiosClient()
    .get(`/users/tweetAction/${tweet_id}`, { params })
    .then((res) => res.data);
};
