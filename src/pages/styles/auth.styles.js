import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-main);
  padding-top: 30px;

  @media (max-width: 500px) {
    padding-top: 10px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: var(--bg-sec);
  margin: auto;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05); */
  border-radius: 24px;
  border: 1px solid var(--text-slight-pri);
  padding: 20px 25px;

  p.title {
    margin: 20px 0 30px 0;
    font-weight: 600;
    color: var(--text-up-pri);
  }

  p.sub-title {
    color: var(--text-slight-pri);
    font-size: 14;
    font-weight: 400;
  }

  @media (max-width: 500px) {
    padding: 15px;
    border: none;
    background-color: var(--bg-main);
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 15px;

  span {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    left: 10px;
  }
`;

export const Button = styled.button`
  border-radius: 8px;
  background-color: var(--primary);
  color: var(--bg-main);
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  font-weight: 500;
`;

export const Social = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  @media (max-width: 500px) {
    margin-top: 25px;
    .icon_wrapper {
      margin-top: 20px;
    }
  }

  .icon_wrapper {
    display: flex;
    margin-top: 10px;
    span {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0px 15px;
      border: 1px solid var(--text-light-pri);
      display: flex;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      :hover {
        border: 1px solid var(--primary);
        svg {
          color: var(--primary);
        }
      }

      svg {
        transition: all 0.25s ease-in-out;
        margin: auto;
        color: var(--text-light-pri);
        font-size: 20px;
      }
    }
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 12px;
  font-weight: 500;
  display: block;
  margin-bottom: 10px;
`;

export const Typography = styled.p`
  font-size: ${({ font_size }) => `${font_size || 16}px`};
  font-weight: ${({ font_weight }) => font_weight || 400};
  color: ${({ color }) => color || '#ffffff'};
  line-height: ${({ line_height }) => `${line_height || 22}px`};
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid var(--text-slight-pri);
  border-radius: 8px;
  padding: 13px 13px 13px 36px;
  font-size: 16px;
  font-weight: 400;
  background-color: transparent;
  color: var(--text-pri);

  ::placeholder {
    color: var(--text-light-pri);
  }
`;

export const Icon = styled.span`
  color: var(--text-light-pri);
  font-size: 20px;
`;
