import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Wrapper } from './AddTweet.styles';
import { MdImage, MdClose } from 'react-icons/md';
import { AiOutlineFileGif } from 'react-icons/ai';
import { ImEarth } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import no_user from '../../assets/no_user.png';
import MenuReply from './MenuReply';
import GifBox from '../GifBox';
import axiosClient from '../../api/axiosClient';
import { add } from '../../features/tweet/tweetSlice';
import { Link } from 'react-router-dom';
const AddTweet = () => {
  const { user } = useSelector((state) => state.auth);
  const [openReply, setOpenReply] = useState(false);
  const buttonRef = useRef(null);
  const fileRef = useRef(null);
  const [canReply, setCanReply] = useState('EVERYONE');
  const [image, setImage] = useState(null);
  const [gif, setGif] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [openGif, setOpenGif] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const dispatch = useDispatch();

  const handleReset = () => {
    setTitle('');
    setImage(null);
    setGif(null);
    setTag('');
    setTags([]);
    setCanReply('EVERYONE');
  };

  const handleChangeImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleRemoveGif = () => {
    setGif(null);
  };

  const addTag = () => {
    if (!tag || !tag.trim().length) return;
    setTags([
      ...tags,
      {
        label: tag,
        id: new Date().getTime(),
      },
    ]);
    setTag('');
  };

  const removeTag = (id) => {
    const newTags = tags.filter((x) => x.id !== id);
    setTags(newTags);
  };

  const getPreviewUrl = useCallback((file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result);
    };
  }, []);

  const handleAddTweet = async () => {
    if (!title.trim().length || loading) {
      return;
    }

    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('title', title);
      formData.append('can_reply', canReply);
      if (tags.length > 0) {
        formData.append('tags', tags.map((t) => t.label).join(','));
      }
      if (image) {
        formData.append('image', image);
      }
      if (gif) {
        formData.append('gif', gif);
      }

      let res = await axiosClient().post('/tweets', formData);
      console.log(res.data);
      res.data.isLoggedInUserLiked = false;
      res.data.isLoggedInUserRetweeted = false;
      res.data.isLoggedInUserSaved = false;
      res.data.retweetedBy = false;
      dispatch(add(res.data));
      handleReset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
    } else {
      getPreviewUrl(image);
    }
  }, [image, getPreviewUrl]);

  return (
    <Wrapper active={title.trim().length > 0 && !loading}>
      <GifBox
        open={openGif}
        onClose={() => {
          setOpenGif(false);
        }}
        setGif={setGif}
      />
      <p className='title'>Tweet something</p>
      <div className='divider'></div>
      <div className='tweet-wrapper'>
        <Link to={`/profile/${user._id}`}>
          <img src={user.photo || no_user} className='user-image' alt='' />
        </Link>
        <div className='more'>
          <textarea
            placeholder="What's happening?"
            rows='3'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {previewUrl && (
            <div className='tweet-image-wrapper'>
              <span className='close' onClick={handleRemoveImage}>
                <MdClose />
              </span>
              <img src={previewUrl} alt='' className='tweet-image' />
            </div>
          )}
          {gif && (
            <div className='tweet-image-wrapper'>
              <span className='close' onClick={handleRemoveGif}>
                <MdClose />
              </span>
              <img src={gif} alt='' className='tweet-image' />
            </div>
          )}
          <input
            type='text'
            className='input-hashtag'
            placeholder='Add hashtag'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTag();
              }
            }}
          />
          <div style={{ marginBottom: '5px' }}>
            {tags.map((tag) => {
              return (
                <span key={tag.id} className='hash-tag'>
                  <MdClose onClick={() => removeTag(tag.id)} />#{tag.label}
                  {`  `}
                </span>
              );
            })}
          </div>
          <div className='bottom'>
            <input
              type='file'
              ref={fileRef}
              hidden
              onChange={handleChangeImage}
            />
            <MdImage
              className='image'
              onClick={() => {
                if (!gif) {
                  fileRef.current?.click();
                }
              }}
            />
            <AiOutlineFileGif
              className='image'
              style={{ fontSize: '20px' }}
              onClick={() => {
                if (!image) {
                  setOpenGif(true);
                }
              }}
            />
            <div className='can-reply'>
              <button ref={buttonRef} onClick={() => setOpenReply((x) => !x)}>
                <ImEarth />
                <span>
                  {canReply === 'EVERYONE'
                    ? 'Everyone can reply'
                    : 'People you follow can reply'}
                </span>
              </button>
              {openReply && (
                <MenuReply
                  buttonRef={buttonRef}
                  onClose={() => setOpenReply(false)}
                  canReply={canReply}
                  setCanReply={setCanReply}
                />
              )}
            </div>
            <button className='tweet-btn' onClick={handleAddTweet}>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddTweet;
