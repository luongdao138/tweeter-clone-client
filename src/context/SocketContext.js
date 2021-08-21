import { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { backendUrl } from '../api/axiosClient';
import { online as onlineAuth } from '../features/auth/authSlice';
import { online as onlineUser } from '../features/user/userSlice';
import { add, online as onlineTweet } from '../features/tweet/tweetSlice';
import { useLocation } from 'react-router';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (user._id) {
      const newSocket = io(backendUrl, {
        path: '/tweeter-clone-socket.io',
      });
      setSocket(newSocket);
      newSocket.emit('online', { user_id: user._id });
    }
    return () => {
      socket?.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('online', ({ user_id }) => {
        if (user._id === user_id) {
          dispatch(onlineAuth());
        }
        dispatch(onlineTweet(user_id));
        dispatch(onlineUser(user_id));
      });

      socket.on('new_tweet', ({ tweet }) => {
        if (location.pathname === '/') {
          dispatch(add(tweet));
        }
      });
    }
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
export default SocketProvider;
