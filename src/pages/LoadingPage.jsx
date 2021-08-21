import React from 'react';
import styled from 'styled-components';
import SpinnerFc from '../components/Spinner';
const LoadingPage = () => {
  return (
    <Wrapper>
      <SpinnerFc width='50px' />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default LoadingPage;
