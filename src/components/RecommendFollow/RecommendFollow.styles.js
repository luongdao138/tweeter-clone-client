import styled from 'styled-components';

export const Wrapper = styled.div`
  background: var(--bg-sec);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 15px;

  p.title {
    font-weight: 600;
    color: var(--text-med-pri);
    font-size: 12px;
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid #8282822e;
  }
`;
