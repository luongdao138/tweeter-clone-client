import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  .label {
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-up-pri);

    @media (max-width: 800px) {
      font-size: 13px;
    }
  }

  .tweet-count {
    color: var(--text-light-pri);
    font-weight: 500;
    font-size: 12px;
  }
`;
