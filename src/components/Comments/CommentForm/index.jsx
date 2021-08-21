import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineFileGif } from 'react-icons/ai';
import { MdClose, MdImage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../../api/comment';
import no_user from '../../../assets/no_user.png';
import { add } from '../../../features/comment/commentSlice';
import { comment } from '../../../features/tweet/tweetSlice';
import GifBox from '../../GifBox';
import { Wrapper } from './CommentForm.styles';
const CommentForm = ({ tweet_id }) => {
  const fileRef = useRef();
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [gif, setGif] = useState(null);
  const [openGif, setOpenGif] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const addComment = () => {
    dispatch(comment(tweet_id));
  };

  const replyTweet = async (e) => {
    e.preventDefault();
    if ((!content.trim().length && !gif && !file) || addLoading) {
      console.log('Not ok');
      return;
    }

    try {
      setAddLoading(true);
      const formData = new FormData();
      formData.append('content', content);
      if (file) {
        formData.append('image', file);
      }
      if (gif) {
        formData.append('gif', gif);
      }
      const data = await postComment(tweet_id, formData);
      setGif(null);
      setFile(null);
      setContent('');
      setAddLoading(false);
      addComment();
      dispatch(add(data));
    } catch (error) {
      console.log(error);
      setAddLoading(false);
    }
  };

  const handleChangeImage = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = (e) => {
    setFile(null);
  };

  const getPreviewUrl = useCallback((file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result);
    };
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
    } else {
      getPreviewUrl(file);
    }
  }, [file, getPreviewUrl]);

  return (
    <Wrapper>
      <GifBox
        open={openGif}
        onClose={() => {
          setOpenGif(false);
        }}
        setGif={setGif}
      />
      <form onSubmit={replyTweet}>
        <img className='user-photo' src={user.photo || no_user} alt='' />
        <div className='right'>
          <div className='content'>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows='3'
              type='text'
              placeholder='Tweet your reply'
            />
            {previewUrl && (
              <div className='preview-wrapper'>
                <img className='preview' src={previewUrl} alt='' />
                <span className='close' onClick={handleRemoveImage}>
                  <MdClose />
                </span>
              </div>
            )}
            {gif && (
              <div className='preview-wrapper'>
                <img className='preview' src={gif} alt='' />
                <span className='close' onClick={() => setGif(null)}>
                  <MdClose />
                </span>
              </div>
            )}
            <div className='action'>
              <input
                type='file'
                ref={fileRef}
                hidden
                onChange={handleChangeImage}
              />
              <div>
                <MdImage
                  onClick={() => {
                    if (!gif) {
                      fileRef.current?.click();
                    }
                  }}
                />
                <AiOutlineFileGif
                  onClick={() => {
                    if (!file) {
                      setOpenGif(true);
                    }
                  }}
                  style={{ fontSize: '18px' }}
                />
              </div>
              <button disabled={addLoading} type='submit'>
                {addLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default CommentForm;
