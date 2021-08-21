import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axiosClient from '../api/axiosClient';
import AddTweet from '../components/AddTweet';
import RecommendFollow from '../components/RecommendFollow';
import Search from '../components/Search';
import SpinnerFc from '../components/Spinner';
import Timeline from '../components/Timeline';
import TrendHashtag from '../components/TrendHashtag';
import {
  fetch_fulfilled,
  fetch_request,
  reset,
} from '../features/tweet/tweetSlice';
import { Wrapper } from '../GlobalStyle';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tweet);
  const {
    pagination: { skip, limit },
  } = useSelector((state) => state.tweet);

  useEffect(() => {
    const getTimeline = async () => {
      dispatch(fetch_request());
      const res = await axiosClient().get('/tweets', {
        params: {
          limit,
          skip: 0,
        },
      });
      dispatch(
        fetch_fulfilled({
          list: res.data.tweets,
          pagination: res.data.pagination,
        })
      );
    };

    getTimeline();

    return () => {
      dispatch(reset());
    };
  }, [dispatch, limit]);

  return (
    <Wrapper style={{ paddingTop: '25px' }}>
      <Left style={{ position: 'relative' }}>
        <Search />
        <AddTweet />
        {loading ? (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <SpinnerFc width='36px' />
          </div>
        ) : (
          <Timeline
            fetchMoreUrl='/tweets'
            options={{
              params: {
                limit,
                skip: skip + limit,
              },
            }}
          />
        )}
      </Left>
      <Right>
        <TrendHashtag />
        <RecommendFollow />
      </Right>
    </Wrapper>
  );
};

export const Left = styled.div`
  width: 70%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const Right = styled.div`
  width: 30%;
  margin-left: 20px;

  @media (max-width: 800px) {
    display: none;
  }
`;

export default HomePage;
