import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserBookmark } from '../api/tweet';
import FilterBox from '../components/FilterBox';
import SpinnerFc from '../components/Spinner';
import Timeline from '../components/Timeline';
import { fetch_request, fetch_fulfilled } from '../features/tweet/tweetSlice';
import { Content, Left, Right } from './Layout';

const filterOptions = [
  {
    filter_active: 'tweet',
    label: 'Tweets',
  },
  {
    filter_active: 'tweet_reply',
    label: 'Tweets & replies',
  },
  {
    filter_active: 'media',
    label: 'Media',
  },
  {
    filter_active: 'like',
    label: 'Likes',
  },
];
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
const BookmarkPage = () => {
  const [filter, setFilter] = useState('tweet');
  const {
    pagination: { limit, skip },
    loading,
  } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBookmark = async () => {
      dispatch(fetch_request());
      try {
        const data = await getUserBookmark({
          filter,
          limit,
          skip: 0,
        });

        dispatch(
          fetch_fulfilled({
            list: data.tweets,
            pagination: data.pagination,
          })
        );
      } catch (error) {}
    };

    getBookmark();
  }, [filter, dispatch, limit]);

  return (
    <Content>
      <Left>
        <FilterBox
          filter={filter}
          setFilter={setFilter}
          options={filterOptions}
        />
      </Left>
      <Right>
        {loading ? (
          <Loading />
        ) : (
          <Timeline
            fetchMoreUrl={`/tweets/bookmark`}
            options={{
              params: {
                limit,
                skip: skip + limit,
                filter,
              },
            }}
          />
        )}
      </Right>
    </Content>
  );
};

export default BookmarkPage;
