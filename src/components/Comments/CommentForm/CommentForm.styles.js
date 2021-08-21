import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 20px;
  form {
    width: 100%;
    display: flex;
    img.user-photo {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      object-fit: cover;
      margin-right: 10px;
    }
    .right {
      flex-grow: 1;
      display: flex;
      align-items: center;
      background-color: var(--bg-main);
      border-radius: 8px;
      border: 1px solid var(--bg-main);
      padding: 0 10px;

      .content {
        flex-grow: 1;
        textarea {
          border: none;
          padding: 8px 0;
          outline: none;
          resize: none;
          color: var(--text-pri);
          width: 100%;
          background-color: transparent;
          /* background-color: #fafafa; */
          margin-right: 10px;
          font-weight: 500;
          ::placeholder {
            color: var(--text-slight-pri);
          }
        }
        .preview-wrapper {
          position: relative;
          span.close {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 25px;
            height: 25px;
            display: flex;
            cursor: pointer;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.4);
            svg {
              margin: auto;
              color: var(--bg-sec);
            }
          }
          .preview {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 12px;
          }
        }
      }
      .action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        svg {
          font-size: 20px;
          color: var(--primary);
          margin-right: 8px;
          cursor: pointer;
        }
        button {
          background: var(--primary);
          border-radius: 4px;
          color: var(--bg-sec);
          font-weight: 500;
          font-size: 12px;
          padding: 6px 15px;
          cursor: pointer;
        }
      }
    }
  }
`;
