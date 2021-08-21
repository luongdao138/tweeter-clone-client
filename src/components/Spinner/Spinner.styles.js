import styled from 'styled-components';

export const Spinner = styled.div`
  width: ${({ width }) => width};
  height: ${({ width }) => width};
  background-color: transparent;
  border-radius: 50%;
  border: 4px solid #e0e0e0;
  border-top: 4px solid var(--primary);
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
