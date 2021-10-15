import axios from 'axios';

export const backendUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://luong-tweeter-clone.herokuapp.com';

const axiosClient = () =>
  axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('tweeter_token')}`,
    },
  });

export default axiosClient;
