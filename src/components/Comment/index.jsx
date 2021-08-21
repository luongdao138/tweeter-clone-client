import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { convertNumber } from '../../helpers/convert';
import no_user from '../../assets/no_user.png';
import { Wrapper } from './Comment.styles';
import { useDispatch } from 'react-redux';
import { getUserLikeComment, likeComment } from '../../api/comment';
import { like } from '../../features/comment/commentSlice';
import { fetch_fulfilled, fetch_request } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import UserLikeBox from '../UserLikeBox';
import { useThemeContext } from '../../context/ThemeContext';
const Comment = ({
  user_id,
  display_name,
  user_photo,
  createdAt,
  content,
  image,
  isLiked,
  liked_count,
  comment_id,
}) => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const {
    pagination: { limit, skip },
  } = useSelector((state) => state.user);

  const handleLikeComment = async () => {
    try {
      await likeComment(comment_id);
      dispatch(like(comment_id));
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreUser = async () => {
    const data = await getUserLikeComment(comment_id, {
      skip: skip + limit,
      limit,
    });
    return data;
  };

  const getUserLike = async () => {
    dispatch(fetch_request());
    const data = await getUserLikeComment(comment_id, {
      limit,
      skip: 0,
    });
    console.log('user like', data);
    dispatch(
      fetch_fulfilled({
        list: data.users,
        pagination: data.pagination,
      })
    );
  };

  return (
    <Wrapper>
      <UserLikeBox
        open={open}
        onClose={() => setOpen(false)}
        fetchMore={getMoreUser}
      />

      <Link to={`/profile/${user_id}`}>
        <img src={user_photo || no_user} alt='' className='user_photo' />
      </Link>
      <div className='right'>
        <div className='right-comment'>
          <div className='user-info'>
            <Link to={`/profile/${user_id}`} className='user-name'>
              {display_name}
            </Link>
            <span className='createdAt'>{createdAt}</span>
          </div>
          <p className='content'>{content}</p>
          {image && <img src={image} className='comment-img' alt='' />}
        </div>
        <div className='like-wrapper'>
          <span
            style={{
              color: isLiked
                ? theme.colors.component.primary
                : theme.colors.text.s_light_primary,
            }}
            onClick={handleLikeComment}
          >
            <AiOutlineHeart />
            {isLiked ? 'Liked' : 'Like'}
          </span>
          <span
            onClick={() => {
              getUserLike();
              setOpen(true);
            }}
          >
            {convertNumber(liked_count)} {liked_count > 1 ? 'Likes' : 'Like '}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Comment;
