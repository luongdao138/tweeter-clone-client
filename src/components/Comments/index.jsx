import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Wrapper } from './Comments.styles';
import Comment from '../Comment';
import {
  fetch_fulfilled,
  fetch_request,
  fetch_more,
} from '../../features/comment/commentSlice';
import { getComments } from '../../api/comment';
import SpinnerFc from '../Spinner';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Title } from '../UserLikeBox/UserLikeBox.styles';

const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <SpinnerFc width='36px' />
  </div>
);
const Comments = ({ tweet_id }) => {
  const dispatch = useDispatch();
  const {
    list,
    loading,
    pagination: { limit, skip, total_results },
  } = useSelector((state) => state.comment);

  useEffect(() => {
    const getTweetComments = async () => {
      try {
        dispatch(fetch_request());
        const data = await getComments(tweet_id, {
          limit,
          skip: 0,
        });
        // console.log(data);
        dispatch(
          fetch_fulfilled({
            list: data.comments,
            pagination: data.pagination,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    getTweetComments();
  }, [tweet_id, dispatch, limit]);

  const fetchMoreComments = async () => {
    try {
      const data = await getComments(tweet_id, {
        limit,
        skip: skip + limit,
      });
      // console.log(data);
      dispatch(
        fetch_more({
          list: data.comments,
          pagination: data.pagination,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={list.length}
          hasMore={list.length < total_results}
          next={fetchMoreComments}
          loader={
            <p
              style={{ textAlign: 'center', fontSize: '12px', fontWeight: 500 }}
            >
              Loading...
            </p>
          }
        >
          {list.length === 0 ? (
            <Title>No replies yet</Title>
          ) : (
            list.map((comment) => {
              return (
                <Comment
                  comment_id={comment._id}
                  key={comment._id}
                  content={comment.content}
                  createdAt={
                    moment(comment.createdAt).format('DD MMMM') +
                    ' at ' +
                    moment(comment.createdAt).format('hh:mm')
                  }
                  display_name={comment.user.display_name}
                  image={comment.image}
                  isLiked={comment.isLiked}
                  user_id={comment.user._id}
                  liked_count={comment.liked_count}
                  user_photo={comment.user.photo}
                />
              );
              // </InfiniteScroll>
            })
          )}
        </InfiniteScroll>
      )}
    </Wrapper>
  );
};

export default Comments;
