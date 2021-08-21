import axiosClient from './axiosClient';

export const searchTweet = async (params) => {
  return axiosClient()
    .get('/tweets/search', {
      params,
    })
    .then((res) => res.data);
};

export const getTweetsByHashtag = async (params) => {
  return axiosClient()
    .get('/tweets/hashtag', {
      params,
    })
    .then((res) => res.data);
};

export const getHashtagTrends = async () => {
  return axiosClient()
    .get('/tweets/trend/hashtag')
    .then((res) => res.data);
};

export const getTweetById = async (tweet_id) => {
  return axiosClient()
    .get(`/tweets/${tweet_id}`)
    .then((res) => res.data);
};

export const getCanReply = async (tweet_user_id) => {
  return axiosClient()
    .get(`/tweets/canReply/${tweet_user_id}`)
    .then((res) => res.data);
};

export const getUserExplore = async (params) => {
  return axiosClient()
    .get(`/tweets/explore`, { params })
    .then((res) => res.data);
};

export const getUserBookmark = async (params) => {
  return axiosClient()
    .get('/tweets/bookmark', { params })
    .then((res) => res.data);
};
