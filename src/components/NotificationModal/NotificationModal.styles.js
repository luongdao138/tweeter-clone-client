import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.25s ease-in-out;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
`;

export const Content = styled.div`
  transition: all 0.25s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 15px;
  right: 0;
  width: 270px;
  transform-origin: 100%;
  z-index: 1200;
  background-color: var(--bg-sec);
  transform: ${({ open }) => (open ? 'scaleX(1)' : 'scaleX(0)')};
  .header {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;

    svg {
      color: var(--text-pri);
      font-size: 24px;
      cursor: pointer;
    }
  }
  p.title {
    color: var(--text-pri);
    font-size: 16px;
    font-weight: 600;
  }

  .main {
    max-height: 450px;
    overflow-y: auto;
  }
`;
