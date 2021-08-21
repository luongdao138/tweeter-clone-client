import React from 'react';
import { Link } from 'react-router-dom';
import { convertNumber } from '../../helpers/convert';
import { Wrapper } from './Hashtag.styles';
const Hashtag = ({ label, tweet_count }) => {
  return (
    <Wrapper>
      <Link to={`/hashtag/${label}`} className='label'>
        #{label}
      </Link>
      <span className='tweet-count'>
        {convertNumber(tweet_count)} {tweet_count > 1 ? 'Tweets' : 'Tweet'}
      </span>
    </Wrapper>
  );
};

export default Hashtag;
