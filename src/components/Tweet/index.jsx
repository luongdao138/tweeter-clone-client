import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import no_user from '../../assets/no_user.png';
import { BiComment } from 'react-icons/bi';
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { ActionItem, Wrapper, Retweeted } from './Tweet.styles';
import { convertNumber } from '../../helpers/convert';
import axiosClient from '../../api/axiosClient';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { fetch_request, fetch_fulfilled } from '../../features/user/userSlice';
import axios from 'axios';
import { like, retweet, save } from '../../features/tweet/tweetSlice';
import { useSelector } from 'react-redux';
import { getCanReply } from '../../api/tweet';
import { getTweetActionUsers } from '../../api/user';
import CommentForm from '../Comments/CommentForm';
import UserLikeBox from '../UserLikeBox';
import { useThemeContext } from '../../context/ThemeContext';
import { useSocketContext } from '../../context/SocketContext';
const Tweet = ({
  user_id,
  user_photo,
  username,
  createdAt,
  title,
  tweet_image,
  comment_count,
  retweet_count,
  saved_count,
  like_count,
  tweet_id,
  isLoggedInUserRetweet,
  isLoggedInUserLike,
  isLoggedInUserSave,
  retweetedBy,
  tags,
  can_reply,
  is_online,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useThemeContext();
  const {
    pagination: { limit, skip },
  } = useSelector((state) => state.user);
  const [openComments, setOpenComments] = useState(false);
  const [type, setType] = useState(null);
  const [canLoggedInUserReply, setCanLoggedInUserReply] = useState(false);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (user_id) {
      const getCanUserReply = async () => {
        const data = await getCanReply(user_id);
        setCanLoggedInUserReply(data.canLoggedInUserReply);
      };
      if (can_reply === 'EVERYONE' || user_id === user._id) {
        setCanLoggedInUserReply(true);
      } else {
        getCanUserReply();
      }
    }
  }, [can_reply, user_id, user._id]);

  useEffect(() => {
    if (!type) return;
    dispatch(fetch_request());
    const getUsers = async () => {
      const data = await getTweetActionUsers(tweet_id, {
        limit,
        skip: 0,
        type,
      });
      dispatch(
        fetch_fulfilled({
          list: data.users,
          pagination: data.pagination,
        })
      );
    };
    getUsers();
  }, [type, dispatch, limit, tweet_id]);

  const getMoreUsers = async () => {
    const data = getTweetActionUsers(tweet_id, {
      type,
      limit,
      skip: skip + limit,
    });
    return data;
  };

  const handleSaveTweet = async () => {
    try {
      await axiosClient().post('/tweets/save', {
        tweet_id,
      });
      dispatch(save(tweet_id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(logout());
        }
      } else {
        console.log(error);
      }
    }
  };

  const handleLikeTweet = async () => {
    try {
      await axiosClient().post('/tweets/like', {
        tweet_id,
      });
      if (user._id !== user_id && !isLoggedInUserLike) {
        socket?.emit('add_nof', {
          type: 'LIKE',
          tweet_id,
          sender: user._id,
          receiver: user_id,
        });
      }
      dispatch(like(tweet_id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(logout());
        }
      } else {
        console.log(error);
      }
    }
  };

  const handleRetweet = async () => {
    try {
      await axiosClient().post('/tweets/retweet', {
        tweet_id,
      });
      dispatch(retweet(tweet_id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(logout());
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      {retweetedBy && (
        <Retweeted to='/'>
          <AiOutlineRetweet />
          {retweetedBy.display_name} retweeted
        </Retweeted>
      )}
      {type && (
        <UserLikeBox
          fetchMore={getMoreUsers}
          onClose={() => setType(null)}
          open={type !== null}
          title={
            type === 'saved'
              ? 'Saved by'
              : type === 'like'
              ? 'Liked by'
              : 'Retweeted by'
          }
        />
      )}
      <Wrapper>
        <div className='user'>
          <Link to={`/profile/${user_id}`} className='user-image'>
            {is_online && <span className='online'></span>}
            <img src={user_photo || no_user} alt='' />
          </Link>
          <div>
            <Link to={`/profile/${user_id}`} className='username'>
              {username}
            </Link>
            <span className='createdAt'>{createdAt}</span>
          </div>
        </div>
        <Link to={`/tweet/${tweet_id}`} className='title'>
          {title}
        </Link>
        {tags && (
          <div
            style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap ' }}
          >
            {tags.map((tag, index) => (
              <Link to={`/hashtag/${tag}`} className='hash-tag' key={index}>
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {tweet_image && (
          <Link to={`/tweet/${tweet_id}`} className='tweet-image'>
            <img src={tweet_image} alt='' />
          </Link>
        )}
        <div className='stats'>
          <span style={{ cursor: 'default' }}>
            {convertNumber(comment_count)}{' '}
            {comment_count > 1 ? 'Comments' : 'Comment'}
          </span>
          <span onClick={() => setType('retweet')}>
            {convertNumber(retweet_count)}{' '}
            {retweet_count > 1 ? 'Retweets' : 'Retweet'}
          </span>
          <span onClick={() => setType('like')}>
            {convertNumber(like_count)} {like_count > 1 ? 'Likes' : 'Like'}
          </span>
          <span onClick={() => setType('saved')}>
            {convertNumber(saved_count)} Saved
          </span>
        </div>
        <div className='actions'>
          {canLoggedInUserReply && (
            <ActionItem
              color={theme.colors.text.med_primary}
              onClick={() => setOpenComments(true)}
            >
              <BiComment />
              <span>Comment</span>
            </ActionItem>
          )}
          <ActionItem
            onClick={handleRetweet}
            color={
              isLoggedInUserRetweet
                ? theme.colors.component.primary
                : theme.colors.text.med_primary
            }
          >
            <AiOutlineRetweet />
            <span>Retweeted</span>
          </ActionItem>
          <ActionItem
            onClick={handleLikeTweet}
            color={
              isLoggedInUserLike
                ? theme.colors.component.primary
                : theme.colors.text.med_primary
            }
          >
            <AiOutlineHeart />
            <span>Liked</span>
          </ActionItem>
          <ActionItem
            onClick={handleSaveTweet}
            color={
              isLoggedInUserSave
                ? theme.colors.component.primary
                : theme.colors.text.med_primary
            }
          >
            <FaRegBookmark />
            <span>Saved</span>
          </ActionItem>
        </div>
        {openComments && (
          <div style={{ marginTop: '10px' }}>
            <CommentForm
              sender={user._id}
              receiver={user_id}
              tweet_id={tweet_id}
              isOwn={user_id === user._id}
            />
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Tweet;
