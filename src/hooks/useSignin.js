import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const useSignin = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        await axiosClient().get('/users');
        setLoading(false);
        history.push('/');
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getUser();
  }, [history]);

  return { loading };
};

export default useSignin;
