import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login_fulfilled, logout } from '../features/auth/authSlice';
import { getUserLogin } from '../api/user';

const useFetchUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUser = async () => {
      try {
        const loggedIn_user = await getUserLogin();
        dispatch(login_fulfilled(loggedIn_user));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            dispatch(logout());
            history.push('/login');
          }
        } else {
          setError('Oops! There is something wrong!');
        }
      }
    };

    if (!user._id) getUser();
    else setLoading(false);
  }, [user._id, history, dispatch]);

  return { loading, error };
};

export default useFetchUser;
