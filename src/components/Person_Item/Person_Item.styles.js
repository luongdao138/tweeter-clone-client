import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #8282822e;
  &:last-child {
    border-bottom: none;
  }
  .info {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    position: relative;
    .online {
      position: absolute;
      z-index: 10;
      display: block;
      width: 10px;
      height: 10px;
      top: -3px;
      left: 0px;
      background-color: var(--primary);
      border-radius: 50%;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      object-fit: cover;
      margin-right: 10px;
    }

    .username {
      color: var(--text-pri);
      font-size: 16px;
      font-weight: 500;
    }

    .follower {
      color: var(--text-light-pri);
      font-size: 12px;
      font-weight: 500;
    }

    @media (max-width: 1000px) {
      .username {
        font-size: 14px;
      }

      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  button {
    position: absolute;
    z-index: 10;
    top: 15px;
    right: 0;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background: var(--primary);
    color: var(--bg-sec);
    font-weight: 500;
    font-size: 10px;
    padding: 4px 12px;
    svg {
      margin-right: 4px;
    }
  }

  .bio {
    color: var(--text-light-pri);
    font-size: 14px;
    font-weight: 500;

    @media (max-width: 1000px) {
      font-size: 12px;
    }
  }
`;
