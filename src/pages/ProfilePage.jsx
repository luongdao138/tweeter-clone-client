import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axiosClient from '../api/axiosClient';
import FilterBox from '../components/FilterBox';
import ProfileInfo from '../components/ProfileInfo';
import {
  fulfilled,
  request,
  reset as resetProfile,
} from '../features/profile/profileSlice';
import Spinner from '../components/Spinner';
import Timeline from '../components/Timeline';
import {
  fetch_request,
  fetch_fulfilled,
  reset,
} from '../features/tweet/tweetSlice';
import { getUserProfile } from '../api/user';
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

const ProfilePage = () => {
  const [filter, setFilter] = useState('tweet');
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loading,
    pagination: { limit, skip },
  } = useSelector((state) => state.tweet);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    const getProfile = async () => {
      try {
        dispatch(request());
        const user_profile = await getUserProfile(id);
        dispatch(
          fulfilled({
            detail: user_profile,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
    return () => {
      dispatch(resetProfile());
    };
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetch_request());
    const getProfile = async () => {
      const res2 = await axiosClient().get(
        `/tweets/user/${id}?limit=${limit}&skip=0&filter=${filter}`
      );
      dispatch(
        fetch_fulfilled({
          list: res2.data.tweets,
          pagination: res2.data.pagination,
        })
      );
    };

    getProfile();

    return () => {
      dispatch(reset());
    };
  }, [id, filter, dispatch, limit]);

  return (
    <>
      {!profileLoading && <ProfileInfo user_id={id} />}
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
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '50px',
                }}
              >
                <Spinner width='36px' />
              </div>
            </>
          ) : (
            <Timeline
              fetchMoreUrl={`/tweets/user/${id}?limit=${limit}&skip=${
                skip + limit
              }&filter=${filter}`}
            />
          )}
        </Right>
      </Content>
    </>
  );
};

export default ProfilePage;
