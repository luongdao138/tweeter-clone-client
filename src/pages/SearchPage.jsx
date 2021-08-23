import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { searchUser } from '../api/user';
import { searchTweet } from '../api/tweet';
import FilterBox from '../components/FilterBox';
import PersonItem from '../components/Person_Item';
import { Content, Left, Right } from './Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  fetch_fulfilled,
  fetch_request,
  fetch_more,
} from '../features/user/userSlice';
import {
  fetch_fulfilled as fetch_fulfilled_tweet,
  fetch_request as fetch_request_tweet,
} from '../features/tweet/tweetSlice';
import SpinnerFc from '../components/Spinner';
import Timeline from '../components/Timeline';
import no_user from '../assets/no_user.png';
import { Title } from '../components/UserLikeBox/UserLikeBox.styles';

const filterOptions = [
  {
    filter_active: 'people',
    label: 'People',
  },
  {
    filter_active: 'tweet',
    label: 'Tweets',
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
const SearchPage = () => {
  const [filter, setFilter] = useState('people');
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q');
  const {
    pagination: { limit: user_limit, skip: user_skip, total_results },
    list: userList,
    loading: user_loading,
  } = useSelector((state) => state.user);
  const {
    pagination: { limit: tweet_limit, skip: tweet_skip },
    loading: tweet_loading,
    list: tweetList,
  } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  const fetchMoreUser = async () => {
    const data = await searchUser({
      q,
      limit: user_limit,
      skip: user_skip + user_limit,
    });
    dispatch(
      fetch_more({
        list: data.users,
        pagination: data.pagination,
      })
    );
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (filter === 'people') {
          dispatch(fetch_request());
          const data = await searchUser({
            q,
            limit: user_limit,
            skip: 0,
          });
          dispatch(
            fetch_fulfilled({
              list: data.users,
              pagination: data.pagination,
            })
          );
        } else {
          dispatch(fetch_request_tweet());
          const data = await searchTweet({
            q,
            limit: tweet_limit,
            skip: 0,
          });
          dispatch(
            fetch_fulfilled_tweet({
              list: data.tweets,
              pagination: data.pagination,
            })
          );
        }
      } catch (error) {}
    };

    handleSearch();
  }, [filter, dispatch, q, tweet_limit, user_limit]);

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
        {/* <SearchContainer> */}
        {/* <InfiniteScroll> */}
        {filter === 'people' ? (
          user_loading ? (
            <Loading />
          ) : (
            <SearchContainer>
              {userList.length > 0 ? (
                <InfiniteScroll
                  dataLength={userList.length}
                  hasMore={user_skip < total_results}
                  loader={<Loading />}
                  next={fetchMoreUser}
                >
                  {userList.map((user, index) => {
                    return (
                      <PersonItem
                        display_name={user.display_name}
                        user_photo={user.photo || no_user}
                        bio={user.bio}
                        isFollow={user.isFollow}
                        follower_count={user.followers_count}
                        user_id={user._id}
                        key={user._id}
                      />
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <Title>No users found!</Title>
              )}
            </SearchContainer>
          )
        ) : tweet_loading ? (
          <Loading />
        ) : tweetList.length ? (
          <Timeline
            fetchMoreUrl={`/tweets/search?q=${q}&limit=${tweet_limit}&skip=${
              tweet_limit + tweet_skip
            }`}
          />
        ) : (
          <SearchContainer>
            <Title>No tweets found!</Title>
          </SearchContainer>
        )}
        {/* </InfiniteScroll> */}
        {/* </SearchContainer> */}
      </Right>
    </Content>
  );
};

const SearchContainer = styled.div`
  background: var(--bg-sec);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 15px;
`;
export default SearchPage;
