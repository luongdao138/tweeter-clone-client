import axiosClient from './axiosClient';

export const getNotifications = async (params) => {
  return axiosClient()
    .get('/notifications', {
      params,
    })
    .then((res) => res.data);
};

export const resetNotifications = async () => {
  return axiosClient()
    .patch('/notifications/reset')
    .then((res) => res.data);
};
