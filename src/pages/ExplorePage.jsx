import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilterBox from '../components/FilterBox';
import Search from '../components/Search';
import { Content, Left, Right } from './Layout';
import { getUserExplore } from '../api/tweet';
import {
  fetch_request as fetch_user_request,
  fetch_fulfilled as fetch_user_fulfilled,
  fetch_more as fetch_user_more,
} from '../features/user/userSlice';
import {
  fetch_request as fetch_tweet_request,
  fetch_fulfilled as fetch_tweet_fulfilled,
} from '../features/tweet/tweetSlice';
import { useDispatch } from 'react-redux';
import Timeline from '../components/Timeline';
import SpinnerFc from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PersonItem from '../components/Person_Item';
import styled from 'styled-components';

const filterOptions = [
  {
    filter_active: 'top',
    label: 'Top',
  },
  {
    filter_active: 'latest',
    label: 'Latest',
  },
  {
    filter_active: 'people',
    label: 'People',
  },
  {
    filter_active: 'media',
    label: 'Media',
  },
];

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
const ExplorePage = () => {
  const [filter, setFilter] = useState('top');
  const dispatch = useDispatch();
  const {
    list: userList,
    loading: userLoading,
    pagination: { limit: userLimit, skip: userSkip, total_results },
  } = useSelector((state) => state.user);
  const {
    loading: tweetLoading,
    pagination: { limit: tweetLimit, skip: tweetSkip },
  } = useSelector((state) => state.tweet);

  useEffect(() => {
    const getExplore = async () => {
      filter === 'people'
        ? dispatch(fetch_user_request())
        : dispatch(fetch_tweet_request());
      const data = await getUserExplore({
        skip: 0,
        filter,
        limit: filter === 'people' ? userLimit : tweetLimit,
      });
      console.log(data);
      filter === 'people'
        ? dispatch(
            fetch_user_fulfilled({
              list: data.users,
              pagination: data.pagination,
            })
          )
        : dispatch(
            fetch_tweet_fulfilled({
              list: data.tweets,
              pagination: data.pagination,
            })
          );
    };

    getExplore();
  }, [filter, dispatch, tweetLimit, userLimit]);

  const fetchMoreUser = async () => {
    const data = await getUserExplore({
      skip: userLimit + userSkip,
      filter,
      limit: filter === 'people' ? userLimit : tweetLimit,
    });
    dispatch(
      fetch_user_more({
        list: data.users,
        pagination: data.pagination,
      })
    );
  };

  return (
    <Content>
      <Left>
        <FilterBox
          options={filterOptions}
          filter={filter}
          setFilter={setFilter}
        />
      </Left>
      <Right>
        <Search />
        {filter === 'people' ? (
          <PeopleContainer>
            {userLoading ? (
              <Loading />
            ) : (
              <InfiniteScroll
                dataLength={userList.length}
                hasMore={userList.length < total_results}
                loader={
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: '14px',
                      textAlign: 'center',
                      color: '#4f4f4f',
                      marginTop: '20px',
                    }}
                  >
                    Loading....
                  </p>
                }
                next={fetchMoreUser}
              >
                {userList.map((u) => {
                  return (
                    <PersonItem
                      key={u._id}
                      display_name={u.display_name}
                      bio={u.bio}
                      user_id={u._id}
                      isFollow={u.isFollow}
                      follower_count={u.followers_count}
                      user_photo={u.photo}
                    />
                  );
                })}
              </InfiniteScroll>
            )}
          </PeopleContainer>
        ) : tweetLoading ? (
          <Loading />
        ) : (
          <Timeline
            fetchMoreUrl={`/tweets/explore`}
            options={{
              params: {
                skip: tweetSkip + tweetLimit,
                limit: tweetLimit,
                filter,
              },
            }}
          />
        )}
      </Right>
    </Content>
  );
};

const PeopleContainer = styled.div`
  background: var(--bg-sec);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 15px;
`;

export default ExplorePage;
