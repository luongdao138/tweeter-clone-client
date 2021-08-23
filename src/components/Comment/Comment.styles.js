import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  .user_photo {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
    margin-right: 10px;
  }
  .right {
    width: 100%;

    .right-comment {
      background: var(--bg-sec);
      border-radius: 8px;
      padding: 10px 15px;
      margin-bottom: 3px;
      width: 100%;

      @media (max-width: 500px) {
        padding: 0;
      }

      .user-info {
        margin-bottom: 5px;
        .user-name {
          font-size: 14px;
          color: var(--text-pri);
          margin-right: 10px;
          font-weight: 500;
        }

        .createdAt {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-slight-pri);
        }

        @media (max-width: 500px) {
          .user-name {
            font-size: 12px;
          }
        }
      }

      .content {
        color: var(--text-med-pri);
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;

        @media (max-width: 500px) {
          font-size: 14px;
        }
      }

      .comment-img {
        border-radius: 8px;
        width: 100%;
        max-height: 300px;
        object-fit: cover;
        margin-top: 10px;
        /* margin-bottom: -10px; */
      }
    }

    .like-wrapper {
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        margin-right: 20px;
        font-weight: 500;
        font-size: 12px;
        cursor: pointer;
        color: var(--text-slight-pri);
        svg {
          font-size: 18px;
          margin-right: 4px;
        }

        @media (max-width: 500px) {
          font-size: 10px;
        }
      }
    }
  }
`;
