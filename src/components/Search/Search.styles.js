import styled from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: var(--bg-sec);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 10px;
  svg {
    margin-right: 10px;
    font-size: 20px;
    color: var(--text-slight-pri);

    @media (max-width: 500px) {
      font-size: 16px;
    }
  }

  input {
    flex-grow: 1;
    font-weight: 500;
    font-size: 16px;
    border: none;
    background-color: transparent;
    color: var(--text-pri);
    &::placeholder {
      color: var(--text-slight-pri);
    }

    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  button {
    background: var(--primary);
    border-radius: 4px;
    color: var(--bg-sec);
    font-weight: 500;
    font-size: 12px;
    padding: 6px 15px;

    @media (max-width: 400px) {
      padding: 4px 5px;
      font-size: 10px;
    }
  }
`;
