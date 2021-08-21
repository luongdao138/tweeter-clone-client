import axiosClient from './axiosClient';

export const getComments = async (tweet_id, params) => {
  return axiosClient()
    .get(`/comments/${tweet_id}`, { params })
    .then((res) => res.data);
};

export const postComment = async (tweet_id, data) => {
  return axiosClient()
    .post(`/comments/${tweet_id}`, data)
    .then((res) => res.data);
};

export const likeComment = async (comment_id) => {
  return axiosClient()
    .patch(`/comments/like/${comment_id}`)
    .then((res) => res.data);
};

export const getUserLikeComment = async (comment_id, params) => {
  return axiosClient()
    .get(`/comments/like/${comment_id}`, { params })
    .then((res) => res.data);
};
