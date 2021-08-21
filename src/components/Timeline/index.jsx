import React from 'react';
import { useSelector } from 'react-redux';
import Tweet from '../Tweet';
import no_user from '../../assets/no_user.png';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosClient from '../../api/axiosClient';
import { useDispatch } from 'react-redux';
import { fetch_more } from '../../features/tweet/tweetSlice';
import Spinner from '../Spinner';

const Timeline = ({ fetchMoreUrl, options }) => {
  const {
    list,
    pagination: { total_results },
  } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  const fetchMoreTweet = async () => {
    try {
      const res = await axiosClient().get(fetchMoreUrl, options);
      dispatch(
        fetch_more({
          list: res.data.tweets,
          pagination: res.data.pagination,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        hasMore={list.length < total_results}
        next={fetchMoreTweet}
        loader={
          <div
            style={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '40px',
            }}
          >
            <Spinner width='36px' />
          </div>
        }
      >
        {list.map((tweet) => {
          return (
            <Tweet
              key={tweet._id}
              tweet_id={tweet._id}
              user_id={tweet.user._id}
              username={tweet.user.display_name}
              user_photo={tweet.user.photo || no_user}
              createdAt={
                moment(tweet.createdAt).format('DD MMMM') +
                ' at ' +
                moment(tweet.createdAt).format('hh:mm')
              }
              tweet_image={tweet.image}
              comment_count={tweet.comment_count}
              retweet_count={tweet.retweet_count}
              saved_count={tweet.saved_count}
              title={tweet.title}
              isLoggedInUserLike={tweet.isLoggedInUserLiked}
              isLoggedInUserRetweet={tweet.isLoggedInUserRetweeted}
              isLoggedInUserSave={tweet.isLoggedInUserSaved}
              retweetedBy={tweet.retweetedBy}
              tags={tweet.tags}
              like_count={tweet.liked_count}
              can_reply={tweet.can_reply}
              is_online={tweet.user.is_online}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Timeline;
