import React, { useRef } from 'react';
import { Content, Title, Wrapper } from './UserLikeBox.styles';
import ReactDOM from 'react-dom';
import useEventListener from '../../hooks/useEventListener';
import SpinnerFc from '../Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetch_more } from '../../features/user/userSlice';
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
const UserLikeBox = ({ open, onClose, fetchMore, title }) => {
  const ref = useRef();
  const {
    loading,
    list,
    pagination: { total_results },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchMoreUser = async () => {
    const data = await fetchMore();
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
          <Content ref={ref}>
            <Title>{title}</Title>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div id='scrollableDiv' className='person-container'>
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
                    {/* {[...new Array(10)].map((_, index) => {
                      return (
                        <PersonItem
                          key={index}
                          display_name={'luongdao'}
                          bio='my bio'
                          user_id='abc'
                          isFollow={true}
                          follower_count={1000}
                          user_photo='https://images.unsplash.com/photo-1629468309177-d93c7e8d0e26?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                        />
                      );
                    })} */}
                  </InfiniteScroll>
                </div>
              </>
            )}
          </Content>
        </Wrapper>,
        document.getElementById('follow-portal')
      )
    : null;
};

export default UserLikeBox;
