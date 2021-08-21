import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getTweetById } from '../api/tweet';
import SpinnerFc from '../components/Spinner';
import TrendHashtag from '../components/TrendHashtag';
import { Content, Left, Right } from './Layout';
import Comments from '../components/Comments';
import {
  fetch_request,
  fetch_fulfilled,
  reset,
} from '../features/tweet/tweetSlice';
import { useDispatch, useSelector } from 'react-redux';
import Timeline from '../components/Timeline';
import styled from 'styled-components';

const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      marginBottom: '20px',
      // paddingTop: '50px',
    }}
  >
    <SpinnerFc width='36px' />
  </div>
);

const TweetDetailPage = () => {
  const { tweet_id } = useParams();
  const [openBackToTop, setOpenBackToTop] = useState(false);
  const dispatch = useDispatch();
  const {
    loading,
    list,
    pagination: { limit },
  } = useSelector((state) => state.tweet);
  useEffect(() => {
    const getTweetDetail = async () => {
      try {
        dispatch(fetch_request());
        const data = await getTweetById(tweet_id);
        if (data) {
          dispatch(
            fetch_fulfilled({
              list: data.tweets,
              pagination: {
                skip: 1,
                total_results: 1,
                limit,
              },
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTweetDetail();
    return () => {
      dispatch(reset());
    };
  }, [tweet_id, dispatch, limit]);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY >= 500) {
        setOpenBackToTop(true);
      } else {
        setOpenBackToTop(false);
      }
    };
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <Content>
      <Right>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Timeline />
          </>
        )}
        <Comments
          tweet_id={tweet_id}
          tweet_user_id={list[0]?.user._id}
          can_reply={list[0]?.can_reply}
        />
      </Right>
      <LeftDetail>
        <TrendHashtag />
      </LeftDetail>
      {openBackToTop && (
        <BackToTop
          onClick={() => {
            window.scrollTo({ top: 100, behavior: 'smooth' });
          }}
        >
          Back to top
        </BackToTop>
      )}
    </Content>
  );
};

const BackToTop = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 100;
  background: var(--primary);
  border-radius: 4px;
  color: var(--bg-sec);
  font-weight: 500;
  font-size: 12px;
  padding: 6px 15px;
  cursor: pointer;
`;

const LeftDetail = styled(Left)`
  margin: 0 0 0 20px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export default TweetDetailPage;
