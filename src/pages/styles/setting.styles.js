import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-main);
  padding-bottom: 20px;

  .main-title {
    text-align: center;
    padding-top: 30px;
    font-weight: 500;
    font-size: 36px;
    color: var(--text-pri);
  }
  .subtitle {
    text-align: center;
    margin-bottom: 20px;
    color: var(--text-pri);
    font-weight: 300;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  margin-top: 20px;
`;

export const BackBtn = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  color: var(--primary);

  svg {
    font-size: 22px;
    margin-right: 2px;
  }
`;

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  background-color: var(--bg-sec);
  margin-top: 30px;
  border: 1px solid #d3d3d3;
  border-radius: 12px;

  @media (max-width: 800px) {
    border: none;
    background-color: var(--bg-main);
  }
`;
export const Header = styled.div`
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    margin-right: 20px;
  }
  @media (max-width: 500px) {
    padding: 20px 15px;
  }
  .big {
    font-weight: 500;
    font-size: 20px;
    color: var(--text-pri);
  }
  .small {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-light-pri);
  }

  button {
    border: 1px solid var(--text-light-pri);
    padding: 4px 20px;
    border-radius: 12px;
    background-color: transparent;
    color: var(--text-light-pri);
  }
`;
export const Content = styled.ul`
  img {
    width: 72px;
    height: 72px;
    border-radius: 8px;
    object-fit: cover;
  }

  li {
    border-top: 1px solid #d3d3d3;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    .title {
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-slight-pri);
      flex: 1;
    }

    .value {
      font-size: 18px;
      color: var(--text-up-pri);
      font-weight: 500;
      line-height: 25px;
      flex: 2.5;
    }

    @media (max-width: 500px) {
      justify-content: space-between;
      padding: 20px 15px;
      .title {
        font-size: 11px;
      }
      .value {
        font-size: 14px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: auto;
  margin-top: 20px;
  color: var(--text-light-pri);
  font-size: 13px;
  @media (max-width: 800px) {
    padding: 0px 15px;
  }
`;
