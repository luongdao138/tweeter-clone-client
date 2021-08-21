import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  /* padding: 15px; */
  background: var(--bg-sec);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  ul {
    padding: 15px 0;
  }
`;

export const FilterItem = styled.li`
  padding: 6px 15px;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ active }) =>
    active ? 'var(--primary)' : 'var(--text-light-pri)'};
  border-left: ${({ active }) =>
    active ? '3px solid var(--primary)' : 'none '};
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;
