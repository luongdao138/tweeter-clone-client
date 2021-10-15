import React, { useRef } from 'react';
import { Content, Title, Wrapper } from './FollowBox.styles';
import ReactDOM from 'react-dom';
import useEventListener from '../../hooks/useEventListener';
import SpinnerFc from '../Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetch_more } from '../../features/user/userSlice';
import { getUserFollow } from '../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import PersonItem from '../Person_Item';

const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '0px',
    }}
  >
    <SpinnerFc width='36px' />
  </div>
);
const FollowBox = ({ open, onClose, type, user_id, display_name }) => {
  const ref = useRef();
  const {
    loading,
    list,
    pagination: { limit, skip, total_results },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchMoreUser = async () => {
    const data = await getUserFollow(user_id, {
      type,
      skip: skip + limit,
      limit,
    });
    dispatch(
      fetch_more({
        list: data.users,
        pagination: data.pagination,
      })
    );
  };

  useEventListener('mousedown', window, (e) => {
    if (!ref.current?.contains(e.target)) {
      onClose();
    }
  });

  return open
    ? ReactDOM.createPortal(
        <Wrapper>
          <Content id='scrollableDiv' ref={ref}>
            <Title>
              {display_name}{' '}
              {type === 'following' ? 'is following' : "'s followers"}
            </Title>
            {loading ? (
              <Loading />
            ) : (
              <>
                <InfiniteScroll
                  dataLength={list.length}
                  hasMore={list.length < total_results}
                  loader={<p className='loading-message'>Loading...</p>}
                  next={fetchMoreUser}
                  scrollableTarget='scrollableDiv'
                >
                  {list.map((u) => {
                    return (
                      <PersonItem
                        key={u._id}
                        display_name={u.display_name}
                        bio={u.bio}
                        user_id={u._id}
                        isFollow={u.isFollow}
                        follower_count={u.followers_count}
                        user_photo={u.photo}
                        is_online={u.is_online}
                      />
                    );
                  })}
                </InfiniteScroll>
              </>
            )}
          </Content>
        </Wrapper>,
        document.getElementById('follow-portal')
      )
    : null;
};

export default FollowBox;
