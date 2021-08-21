import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Retweeted = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-light-pri);
  margin-bottom: 8px;

  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

export const Wrapper = styled.div`
  background-color: var(--bg-sec);
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  padding: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  .user {
    display: flex;
    margin-bottom: 10px;
    img {
      width: 42px;
      height: 42px;
      border-radius: 8px;
      object-fit: cover;
      margin-right: 10px;
    }

    div {
      display: flex;
      flex-direction: column;

      .username {
        font-weight: 500;
        font-size: 16px;
        color: var(--text-pri);
      }

      .createdAt {
        font-size: 12px;
        color: var(--text-slight-pri);
        font-weight: 500;
      }
    }
  }
  .title {
    font-weight: normal;
    font-size: 16px;
    color: var(--text-med-pri);
    display: block;
    line-height: 22px;
    margin-bottom: 8px;
  }

  .hash-tag {
    color: var(--primary);
    font-weight: 500;
    margin-right: 10px;
    font-size: 14px;

    @media (max-width: 500px) {
      font-size: 12px;
    }
  }

  .tweet-image {
    img {
      width: 100%;
      border-radius: 8px;
      height: 100%;
      max-height: 400px;
      object-fit: cover;

      @media (max-width: 800px) {
        max-height: 300px;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: flex-end;
    span {
      display: block;
      margin-left: 15px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-slight-pri);
      margin-top: 10px;
      cursor: pointer;

      @media (max-width: 500px) {
        margin-left: 10px;
        font-size: 10px;
      }
    }
    margin-bottom: 10px;
  }

  .actions {
    display: flex;
    border-top: 1px solid #bdbdbd69;
    padding-top: 10px;

    @media (max-width: 600px) {
      /* display: grid; */
      /* grid-template-columns: 1fr 1fr; */
    }
  }
`;
export const ActionItem = styled.div`
  width: 25%;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: all 0.25s ease-in-out;
  cursor: pointer;
  padding: 10px 0;
  color: ${({ color }) => color};
  svg {
    margin-right: 8px;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    @media (max-width: 550px) {
      display: none;
    }
  }

  &:hover {
    background-color: var(--bg-main);
  }
`;
