import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 50;
  left: 0;
  top: 45px;
  background-color: var(--bg-sec);
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: 10px;
  @media (max-width: 500px) {
    left: -100px;
  }

  .sub-title {
    font-size: 12px;
    color: var(--text-light-pri);
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

export const List = styled.ul`
  li {
    display: flex;
    align-items: center;
    width: 100%;
    transition: all 0.25s ease-in-out;
    padding: 10px;
    width: 180px;
    cursor: pointer;
    border-radius: 8px;
    color: var(--text-med-pri);
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 10px;

    @media (max-width: 500px) {
      /* width: 150px; */
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: var(--bg-main);
    }

    svg {
      margin-right: 10px;
      font-size: 20px;
    }
  }
`;
