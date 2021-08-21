import React, { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { Wrapper } from './ProfileInfo.styles';
import no_user from '../../assets/no_user.png';
import { convertNumber } from '../../helpers/convert';
import { followUser, getUserFollow } from '../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { follow } from '../../features/profile/profileSlice';
import { BsCalendar } from 'react-icons/bs';
import moment from 'moment';
import { fetch_request, fetch_fulfilled } from '../../features/user/userSlice';
import FollowBox from '../FollowBox';

const ProfileInfo = ({ user_id }) => {
  const { detail } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [followType, setFollowType] = useState(null);
  const {
    pagination: { limit },
  } = useSelector((state) => state.user);

  const handleFollowUser = async () => {
    try {
      await followUser(user_id);
      dispatch(follow());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!followType) return;
    const getFollow = async () => {
      dispatch(fetch_request());
      const data = await getUserFollow(user_id, {
        type: followType,
        limit,
        skip: 0,
      });
      console.log(data);
      dispatch(
        fetch_fulfilled({
          list: data.users,
          pagination: data.pagination,
        })
      );
    };

    getFollow();
  }, [followType, dispatch, limit, user_id]);

  return (
    <Wrapper>
      <FollowBox
        open={followType !== null}
        onClose={() => setFollowType(null)}
        user_id={user_id}
        type={followType}
        display_name={detail.display_name}
      />
      <img
        src='https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHN1bW1lcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60'
        className='cover-pic'
        alt=''
      />
      <div className='detail'>
        <img
          style={{
            border: detail?.photo ? '3px solid #ffffff' : 'none',
          }}
          src={detail?.photo || no_user}
          className='photo'
          alt=''
        />
        <div className='detail-left'>
          <div className='info'>
            <span className='username'>
              <span>{detail.display_name}</span>
              <span className='tweet'>
                <strong>{convertNumber(detail?.tweets_count)}</strong>{' '}
                {detail?.tweets_count > 1 ? 'Tweets' : 'Tweet'}
              </span>
            </span>
            <div className='follow-wrapper'>
              <span
                className='follow'
                onClick={() => setFollowType('following')}
              >
                <strong>{convertNumber(detail?.following_count)}</strong>{' '}
                Following
              </span>
              <span
                className='follow'
                onClick={() => setFollowType('followers')}
              >
                <strong>{convertNumber(detail?.followers_count)}</strong>{' '}
                {detail?.followers_count > 1 ? 'Followers' : 'Follower'}
              </span>
            </div>
          </div>
          <p className='bio'>{detail.bio}</p>
          <p className='join'>
            <BsCalendar />
            <span>Joined {moment(detail.createdAt).format('MMMM YYYY')}</span>
          </p>
        </div>
        <div className='detail-right'>
          {detail._id !== user._id &&
            (!detail.isFollow ? (
              <button onClick={handleFollowUser}>
                <FaUserPlus />
                <span>Follow</span>
              </button>
            ) : (
              <button onClick={handleFollowUser}>Following</button>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileInfo;
