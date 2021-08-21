import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { followUser } from '../../api/user';
import no_user from '../../assets/no_user.png';
import { follow } from '../../features/user/userSlice';
import { convertNumber } from '../../helpers/convert';
import { Wrapper } from './Person_Item.styles';
const Person_Item = ({
  user_id,
  user_photo,
  display_name,
  follower_count,
  isFollow,
  bio,
  handleFollow,
  is_online,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleFollowUser = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await followUser(user_id);

      if (handleFollow) {
        handleFollow(user_id);
      } else {
        dispatch(follow(user_id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper to={`/profile/${user_id}`}>
      <div className='info'>
        {is_online && <span className='online'></span>}
        <img src={user_photo || no_user} alt='' />
        <div className='right'>
          <p className='username'>{display_name}</p>
          <p className='follower'>
            {convertNumber(follower_count)}{' '}
            {follower_count > 1 ? 'followers' : 'follower'}
          </p>
        </div>
      </div>
      <p className='bio'>{bio}</p>
      {user_id !== user._id &&
        (!isFollow ? (
          <button onClick={handleFollowUser}>
            <FaUserPlus />
            <span>Follow</span>
          </button>
        ) : (
          <button onClick={handleFollowUser}>Following</button>
        ))}
    </Wrapper>
  );
};

export default Person_Item;
