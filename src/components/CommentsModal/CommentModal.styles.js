import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const Content = styled.div`
  width: 95%;
  max-width: 600px;
  top: 50%;
  left: 50%;
  position: absolute;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05); */
  z-index: 200;
  border-radius: 8px;
  padding: 15px;
`;
