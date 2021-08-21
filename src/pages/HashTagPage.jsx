import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Content, Left, Right } from './Layout';
import {
  fetch_request,
  fetch_fulfilled,
  reset,
} from '../features/tweet/tweetSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetsByHashtag } from '../api/tweet';
import Timeline from '../components/Timeline';
import SpinnerFc from '../components/Spinner';
import TrendHashtag from '../components/TrendHashtag';
import styled from 'styled-components';
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
const HashTagPage = () => {
  const dispatch = useDispatch();
  const {
    pagination: { limit, skip },
    loading,
  } = useSelector((state) => state.tweet);

  const { tag } = useParams();

  useEffect(() => {
    const getTweets = async () => {
      try {
        dispatch(fetch_request());
        const data = await getTweetsByHashtag({
          tag,
          limit,
          skip: 0,
        });
        dispatch(
          fetch_fulfilled({
            list: data.tweets,
            pagination: data.pagination,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    getTweets();

    return () => {
      dispatch(reset());
    };
  }, [tag, dispatch, limit]);

  return (
    <Content>
      <Right>
        {loading ? (
          <Loading />
        ) : (
          <Timeline
            fetchMoreUrl={`/tweets/hashtag`}
            options={{
              tag,
              limit,
              skip: skip + limit,
            }}
          />
        )}
      </Right>
      <LeftDetail>
        <TrendHashtag />
      </LeftDetail>
    </Content>
  );
};

const LeftDetail = styled(Left)`
  margin: 0 0 0 20px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export default HashTagPage;
