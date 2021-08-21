// useFetch hook to fetch data from api
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axiosClient from '../api/axiosClient';
import { logout } from '../features/auth/authSlice';

const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axiosClient().get(url, options);
        setData(res.data);
        setError(null);
      } catch (error) {
        setData(null);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            dispatch(logout());
            history.push('/login');
          }
        } else {
          console.log(error);
          setError('Oops! There is something wrong!');
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
