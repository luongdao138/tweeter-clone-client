import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  display: none;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: var(--bg-sec);
  z-index: 1000;

  @media (max-width: 700px) {
    display: block;
  }

  ul {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
  }
`;

export const MenuItem = styled.li`
  height: 100%;
  display: flex;
  margin: 0 10px;
  align-items: center;

  a {
    display: block;
    padding: 10px 30px;
    border-radius: 8px;
    transition: all 0.25s ease-in-out;

    :hover {
      background-color: var(--bg-main);
    }

    svg {
      color: var(--text-light-pri);
      font-size: 20px;
    }
  }
`;
