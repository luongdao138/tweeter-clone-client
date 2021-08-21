import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  margin-top: 10px;
  background-color: var(--bg-sec);
  @media (max-width: 800px) {
    border: none;
    background-color: var(--bg-main);
  }
`;
export const Content = styled.div`
  width: 100%;
  padding: 30px;
  border-radius: 12px;

  padding-right: 0;
  max-width: 400px;

  @media (max-width: 500px) {
    padding: 15px;
  }
`;

export const Header = styled.div`
  .big {
    font-weight: 500;
    font-size: 20px;
    color: var(--bg-sec);
  }
  .small {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-light-pri);
  }
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
export const Label = styled.span`
  font-weight: 500;
  color: var(--text-med-pri);
  font-size: 13px;
  margin-bottom: 4px;
  display: block;
`;

export const TextArea = styled.textarea`
  height: 100px;
  resize: none;
  outline: none;
  background-color: var(--bg-sec);
  font-size: 16px;
  border: 1px solid var(--text-light-pri);
  padding: 13px;
  border-radius: 12px;
  width: 100%;
  color: var(--text-med-pri);
  font-weight: 500;
  &::placeholder {
    color: var(--text-slight-pri);
  }
`;

export const Button = styled.button`
  border-radius: 8px;
  background-color: var(--primary);
  color: var(--bg-sec);
  /* width: 100%; */
  padding: 12px 20px;
  margin-top: 10px;
  font-weight: 500;
`;

export const ChangeImage = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;

  .image {
    position: relative;
    cursor: pointer;
    img {
      width: 72px;
      height: 72px;
      border-radius: 8px;
      object-fit: cover;
    }
    margin-right: 30px;

    .black,
    svg {
      position: absolute;
      transition: all 0.25s ease-in-out;
      opacity: 0;
      visibility: hidden;
    }
    :hover svg {
      opacity: 1;
      visibility: visible;
    }
    :hover .black {
      opacity: 1;
      visibility: visible;
    }

    .black {
      overflow: hidden;
      top: 0;
      left: 0;
      right: 0;
      bottom: 5px;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
    }

    svg {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      z-index: 20;
    }
  }

  .change {
    cursor: pointer;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.25s ease-in-out;
    color: var(--text-light-pri);

    :hover {
      color: var(--primary);
    }
  }
`;

export const Input = styled.input`
  border: 1px solid var(--text-light-pri);
  padding: 13px;
  border-radius: 12px;
  background-color: transparent;
  width: 100%;
  color: var(--text-med-pri);
  font-weight: 500;

  &::placeholder {
    color: var(--text-slight-pri);
  }
`;
