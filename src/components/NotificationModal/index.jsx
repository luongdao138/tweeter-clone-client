import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import useEventListener from '../../hooks/useEventListener';
import Notification from '../Notification';
import { Content, Wrapper } from './NotificationModal.styles';
import {
  fetch_fulfilled,
  fetch_request,
  fetch_more,
} from '../../features/notification/notificationSlice';
import { getNotifications } from '../../api/notification';
import InfiniteScroll from 'react-infinite-scroll-component';
import no_user from '../../assets/no_user.png';
import moment from 'moment';
import { MdClose } from 'react-icons/md';
import SpinnerFc from '../Spinner';
//notification-portal
const convertNotifications = (n) => {
  const type = n.type;
  let text = '';

  switch (type) {
    case 'LIKE':
      text = `${n.sender.display_name} liked your tweet!`;
      break;
    case 'COMMENT':
      text = `${n.sender.display_name} commented on your tweet!`;
    default:
      break;
  }

  return text;
};

const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '50px',
    }}
  >
    <SpinnerFc width='36px' />
  </div>
);

const NotificationModal = ({ open, onClose }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const {
    list,
    pagination: { skip, limit, total_results },
    loading,
  } = useSelector((state) => state.notification);

  useEventListener('mousedown', window, (e) => {
    if (!ref.current.contains(e.target)) {
      onClose();
    }
  });

  const fetchMoreNotifications = async () => {
    const data = await getNotifications({
      limit,
      skip: skip + limit,
    });
    dispatch(
      fetch_more({
        list: data.notifications,
        pagination: data.pagination,
      })
    );
  };

  useEffect(() => {
    const getData = async () => {
      dispatch(fetch_request());
      const data = await getNotifications({
        limit,
        skip: 0,
      });
      dispatch(
        fetch_fulfilled({
          list: data.notifications,
          pagination: data.pagination,
        })
      );
    };

    getData();
  }, [dispatch, limit]);

  return ReactDOM.createPortal(
    <Wrapper open={open}>
      <Content open={open} ref={ref}>
        <div className='header'>
          <p className='title'>Notifications</p>
          <MdClose onClick={onClose} />
        </div>

        <div id='scrollableDiv' className='main'>
          <InfiniteScroll
            dataLength={list.length}
            hasMore={list.length < total_results}
            loader={<Loading />}
            next={fetchMoreNotifications}
          >
            {list.map((n) => {
              return (
                <Notification
                  key={n._id}
                  text={convertNotifications(n)}
                  user_photo={n.receiver.photo || no_user}
                  time={moment(n.createdAt).fromNow()}
                  tweet_id={n.tweet}
                  onClose={onClose}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      </Content>
    </Wrapper>,
    document.getElementById('notification-portal')
  );
};

export default NotificationModal;
