import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 70px;
  z-index: 100;
  background-color: var(--bg-sec);
  box-shadow: 0 1px 4px rgb(0 0 0 / 25%);
`;

export const Content = styled.div`
  width: 95%;
  height: 100%;
  max-width: 1200px;
  margin: auto;
  /* padding: 0 20px; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul.nav-menu {
    height: 100%;
    display: flex;

    @media (max-width: 700px) {
      display: none;
    }
  }
`;

export const MenuLink = styled.li`
  margin: 0 10px;
  a {
    padding: 0 10px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    height: 100%;
    align-items: center;

    color: ${({ active }) =>
      active ? 'var(--primary)' : 'var(--text-light-pri)'};
    border-bottom: ${({ active }) =>
      active ? '2.5px solid var(--primary)' : 'none'};
  }
`;

export const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .not {
    margin-left: 15px;
    cursor: pointer;
    transform: translateY(3px);
    position: relative;
    svg {
      font-size: 20px;
      color: var(--text-pri);
    }
    .badge {
      position: absolute;
      font-size: 10px;
      color: var(--text-pri);
      background-color: var(--primary);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      display: flex;
      top: -6px;
      left: 9px;
      span {
        margin: auto;
      }
    }
  }
  .button {
    background-color: transparent;
    display: flex;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      object-fit: cover;
    }

    & > span,
    & > svg {
      @media (max-width: 500px) {
        display: none;
      }
    }

    & > span {
      color: var(--text-up-pri);
      margin-left: 10px;
      font-size: 12px;
      font-weight: 600;

      @media (max-width: 500px) {
        display: none;
      }
    }

    & > svg {
      color: var(--text-up-pri);
      margin-left: 10px;
      font-size: 20px;
    }
  }
`;
