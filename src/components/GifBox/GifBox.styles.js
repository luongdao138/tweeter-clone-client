import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 120;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.div`
  width: 95%;
  max-width: 600px;
  top: 50%;
  left: 50%;
  position: absolute;
  background-color: var(--bg-sec);
  transform: translate(-50%, -50%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 200;
  border-radius: 8px;
  padding: 15px;

  .header {
    display: flex;
    align-items: center;
    svg {
      color: var(--text-light-pri);
    }

    .close {
      font-size: 24px;
      cursor: pointer;
      margin-right: 20px;
    }

    .search {
      position: relative;
      flex-grow: 1;
      svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        font-size: 24px;
        color: rgb(83, 100, 113);
      }

      input {
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 32px;
        padding: 13px 13px 13px 46px;
        background-color: transparent;
        color: var(--text-pri);
      }
    }
  }

  .content {
    max-height: 450px;
    overflow-y: auto;
    margin-top: 10px;
    img {
      width: 100%;
      cursor: pointer;
      height: 200px;
      object-fit: cover;
    }

    .abc {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;
