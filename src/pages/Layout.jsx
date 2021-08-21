import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import SmallScreenMenu from '../components/SmallScreenMenu';
import useFetchUser from '../hooks/useFetchUser';
import LoadingPage from './LoadingPage';
const Layout = ({ children }) => {
  const { loading } = useFetchUser();

  if (loading) return <LoadingPage />;

  return (
    <>
      <SmallScreenMenu />
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 70px;

  @media (max-width: 700px) {
    padding-bottom: 70px;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 95%;
  margin-top: 80px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  margin-right: 20px;
  width: 30%;

  @media (max-width: 700px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;
export const Right = styled.div`
  width: 70%;
  position: relative;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export default Layout;
