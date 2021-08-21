import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 30px 30px 0 30px;
  .title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: var(--text-pri);
  }

  .group {
    margin-bottom: 20px;
    .group-title {
      color: var(--text-light-pri);
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .group-bg {
      display: flex;
      align-items: center;
      /* justify-content: space-between; */
      @media (max-width: 550px) {
        flex-direction: column;
      }
    }

    .group-color {
      display: flex;
      align-items: center;
      @media (max-width: 550px) {
        justify-content: space-between;
      }
    }
  }
`;

export const BgItem = styled.div`
  cursor: pointer;
  margin-right: 20px;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border: ${({ active }) => (active ? '2px solid #1DA1F2' : 'none')};
  span {
    font-size: 14px;
    font-weight: 600;
  }

  svg {
    font-size: 20px;
    margin-right: 15px;
  }

  @media (max-width: 550px) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ColorItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  margin-right: 15px;
  cursor: pointer;
  svg {
    color: #ffffff;
    margin: auto;
    font-size: 20px;
  }

  @media (max-width: 550px) {
    width: 22px;
    height: 22px;
  }
`;
