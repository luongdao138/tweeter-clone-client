import React from 'react';
import { useHistory } from 'react-router';
import { Wrapper } from './Notification.styles';

const Notification = ({ user_photo, tweet_id, text, time, onClose }) => {
  const history = useHistory();

  return (
    <Wrapper
      onClick={() => {
        onClose();
        setTimeout(() => {
          history.push(`/tweet/${tweet_id}`);
        }, 500);
      }}
    >
      <img src={user_photo} alt='' />
      <div className='right'>
        <p className='text'>{text}</p>
        <span className='time'>{time}</span>
      </div>
    </Wrapper>
  );
};

export default Notification;
