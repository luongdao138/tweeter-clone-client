import axios from 'axios';

export const backendUrl = 'https://luong-tweeter-clone.herokuapp.com';
// export const backendUrl = 'http://localhost:5000';

const axiosClient = () =>
  axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('tweeter_token')}`,
    },
  });

export default axiosClient;
