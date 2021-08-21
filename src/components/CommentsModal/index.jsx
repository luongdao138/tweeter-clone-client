import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useEventListener from '../../hooks/useEventListener';
import { Content, Wrapper } from './CommentModal.styles';
import Comments from '../Comments';
import CommentForm from '../Comments/CommentForm';
const CommentModal = ({ open, onClose, tweet_id }) => {
  const ref = useRef();
  useEventListener('mousedown', window, (e) => {
    if (!ref.current?.contains(e.target)) {
      onClose();
    }
  });

  return open
    ? ReactDOM.createPortal(
        <Wrapper>
          <Content ref={ref}>
            {/* <Comments
              addComment={addComment}
              tweet_id={tweet_id}
              can_reply={can_reply}
              tweet_user_id={tweet_user_id}
            /> */}
            <CommentForm
              tweet_id={tweet_id}
              cb={() => {
                onClose();
              }}
            />
          </Content>
        </Wrapper>,
        document.getElementById('follow-portal')
      )
    : null;
};

export default CommentModal;
