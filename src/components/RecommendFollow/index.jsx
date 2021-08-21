import React, { useEffect, useState } from 'react';
import { getRecommendFollowing } from '../../api/user';
import { Wrapper } from '../AddTweet/AddTweet.styles';
import PersonItem from '../Person_Item';
import no_user from '../../assets/no_user.png';
import SpinnerFc from '../Spinner';

const Loading = () => (
  <Wrapper>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <SpinnerFc width='36px' />
    </div>
  </Wrapper>
);
const RecommendFollow = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const followUser = (user_id) => {
    let newList = [...list];
    newList.forEach((u) => {
      if (u._id === user_id) {
        u.isFollow = !u.isFollow;
      }
    });

    setList(newList);
  };

  useEffect(() => {
    const getRecommendFollow = async () => {
      setLoading(true);
      const data = await getRecommendFollowing();
      setList(data.users);
      setLoading(false);
    };

    getRecommendFollow();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <p className='title'>Who to follow</p>
      {list.map((u) => {
        return (
          <PersonItem
            key={u._id}
            user_id={u._id}
            isFollow={u.isFollow}
            display_name={u.display_name}
            bio={u.bio}
            follower_count={u.followers_count}
            user_photo={u.photo || no_user}
            cover_photo={u.coverPhoto}
            is_online={u.is_online}
            handleFollow={followUser}
          />
        );
      })}
    </Wrapper>
  );
};

export default RecommendFollow;
