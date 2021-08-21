import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    object-fit: cover;
    margin-right: 10px;
  }

  .right {
    .text {
      color: var(--text-pri);
      font-size: 12px;
    }

    .time {
      color: var(--text-light-pri);
      font-size: 10px;
    }
  }
`;
