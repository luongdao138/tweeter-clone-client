import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .cover-pic {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .photo {
    border: 3px solid var(--bg-sec);
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    left: 15px;
    top: -50px;

    @media (max-width: 650px) {
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 80px;
    }
  }

  .detail {
    position: absolute;
    left: 50%;
    bottom: -60px;
    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    padding: 15px 15px 30px 150px;
    background-color: var(--bg-sec);
    transform: translateX(-50%);
    width: 95%;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;

    .detail-left {
      margin-right: 50px;
      .info {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        span {
          margin-right: 20px;

          &:last-child {
            margin-right: 0;
          }
        }

        .username {
          font-weight: 600;
          font-size: 24px;
          color: var(--text-up-pri);

          display: flex;
          flex-direction: column;
          .tweet {
            font-size: 12px;
            color: var(--text-light-pri);
            strong {
              color: var(--text-up-pri);
            }
          }
        }

        .follow {
          font-weight: 500;
          font-size: 12px;
          color: var(--text-light-pri);
          cursor: pointer;
          strong {
            color: var(--text-up-pri);
          }
        }
      }
      .bio {
        color: var(--text-light-pri);
        font-size: 18px;
        line-height: 22px;
      }

      .join {
        margin-top: 10px;
        display: flex;
        font-weight: 500;
        align-items: center;
        color: rgb(83 100 113);
        font-size: 12px;
        svg {
          font-size: 20px;
          margin-right: 5px;
        }
      }
    }

    .detail-right {
      button {
        display: flex;
        align-items: center;
        border-radius: 4px;
        background: var(--primary);
        color: var(--bg-sec);
        font-weight: 500;
        font-size: 12px;
        padding: 8px 20px;
        svg {
          margin-right: 4px;
        }
      }
    }

    @media (max-width: 650px) {
      padding: 15px;
      padding-top: 50px;
      flex-direction: column;
      align-items: center;

      .detail-left {
        margin-right: 0;
        .info {
          flex-direction: column;
          align-items: center;

          .username {
            margin-right: 0;
            display: flex;
            align-items: center;
            text-align: center;
            span {
              margin: 0;
              font-size: 16px;
            }
          }
        }
        .join {
          justify-content: center;
          margin: 10px 0;
        }

        .bio {
          font-size: 14px;
        }
      }

      .detail-right {
        margin-top: 10px;
      }
    }
  }
`;
