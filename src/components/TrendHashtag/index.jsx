import React, { useEffect, useState } from 'react';
import Hashtag from '../Hashtag';
import { Wrapper } from './TrendHashtag.styles';
import { getHashtagTrends } from '../../api/tweet';
import SpinnerFc from '../Spinner';
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
const TrendHashtag = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrends = async () => {
      try {
        setLoading(true);
        const trends = await getHashtagTrends();
        setData(trends);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getTrends();
  }, []);

  return loading ? (
    <Wrapper>
      <Loading />
    </Wrapper>
  ) : (
    <Wrapper>
      <p className='title'>Trends for you</p>
      {data.map((t, index) => {
        return (
          <Hashtag key={index} label={t.label} tweet_count={t.tweet_count} />
        );
      })}
    </Wrapper>
  );
};

export default TrendHashtag;
