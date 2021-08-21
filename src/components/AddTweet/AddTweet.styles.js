import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--bg-sec);
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: 15px;

  .title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-med-pri);
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 8px 0;
  }

  .tweet-wrapper {
    display: flex;
    .image-link {
      position: relative;

      .online {
        position: absolute;
        z-index: 10;
        display: block;
        width: 10px;
        height: 10px;
        top: -3px;
        left: -3px;
        background-color: var(--primary);
        border-radius: 50%;
      }
    }
    img.user-image {
      width: 42px;
      height: 42px;
      border-radius: 8px;
      object-fit: cover;
      margin-right: 10px;
    }

    .tweet-image-wrapper {
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
      img.tweet-image {
        width: 100%;
        border-radius: 8px;
        max-height: 300px;
        object-fit: cover;
        margin-bottom: 10px;
      }
    }
    .more {
      flex-grow: 1;

      .input-hashtag {
        width: 100%;
        margin-bottom: 10px;
        border: 1px solid var(--text-slight-pri);
        padding: 5px 13px;
        background-color: var(--bg-sec);
        border-radius: 12px;
        width: 100%;
        color: var(--text-slight-pri);
        font-weight: 500;

        &::placeholder {
          color: var(--text-slight-pri);
        }
      }

      span.hash-tag {
        color: var(--primary);
        font-weight: 500;
        margin-right: 15px;
        font-size: 14px;

        position: relative;

        svg {
          position: absolute;
          top: -3px;
          left: -11px;
          color: var(--text-med-pri);
          cursor: pointer;
        }
      }

      .bottom {
        display: flex;
        align-items: center;
        .image {
          color: var(--primary);
          cursor: pointer;
          font-size: 22px;
          margin-right: 10px;
        }

        .can-reply {
          flex-grow: 1;
          position: relative;
          button {
            display: flex;
            align-items: center;
            color: var(--primary);
            background-color: transparent;
            svg {
              font-size: 18px;
              margin-right: 6px;
            }
            span {
              font-weight: 500;
              font-size: 12px;

              @media (max-width: 500px) {
                display: none;
              }
            }
          }
        }

        .tweet-btn {
          background: var(--primary);
          border-radius: 4px;
          color: var(--bg-sec);
          font-weight: 500;
          font-size: 12px;
          padding: 6px 15px;
          opacity: ${({ active }) => (active ? 1 : 0.5)};
          cursor: ${({ active }) => (active ? 'pointer' : 'default')};
        }
      }

      textarea {
        border: none;
        resize: none;
        outline: none;
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        color: var(--text-pri);
        padding-top: 10px;
        background-color: transparent;
        &::-webkit-scrollbar {
          width: 0;
        }

        &::placeholder {
          color: var(--text-slight-pri);
        }

        @media (max-width: 500px) {
          font-size: 14px;
        }
      }
    }
  }
`;
