import {
  Wrapper,
  Content,
  Header,
  FormGroup,
  Label,
  TextArea,
  Button,
  ChangeImage,
  Input,
} from './EditProfileForm.styles';
import { MdCameraAlt } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import no_user from '../../assets/no_user.png';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { update } from '../../features/auth/authSlice';
import { editUserProfile } from '../../api/user';
const EditProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    _id: user._id,
    email: user.email,
    bio: user.bio || '',
    phone: user.phone || '',
    display_name: user.display_name || '',
    photo: user.photo,
  });
  const [password, setPassword] = useState('');
  const [previewUrl, setPreviewUrl] = useState(user.photo);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('display_name', values.display_name);
    formData.append('password', password);
    formData.append('bio', values.bio);
    formData.append('phone', values.phone);
    if (file) {
      formData.append('photo', file);
    }

    try {
      const data = await editUserProfile(formData);
      dispatch(update(data));
      history.push('/setting');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          history.push('/login');
        }
      } else {
        // setError('Oops! There is something wrong!');
      }
    }
  };

  const convertToPreview = useCallback((file) => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
    }
  }, []);

  useEffect(() => {
    convertToPreview(file);
  }, [file, convertToPreview]);

  return (
    <Wrapper>
      <Content>
        <Header>
          <p className='big'>Change Info</p>
          <p className='small'>Changes will be reflected to every services</p>
        </Header>
        <form onSubmit={handleSubmit}>
          <ChangeImage>
            <input
              type='file'
              hidden
              ref={inputRef}
              onChange={(e) => {
                if (e.target.files) setFile(e.target.files[0]);
              }}
            />
            <div className='image' onClick={() => inputRef.current?.click()}>
              <img src={previewUrl || no_user} alt='' />
              <div className='black'></div>
              <MdCameraAlt />
            </div>
            <span className='change' onClick={() => inputRef.current?.click()}>
              Change photo
            </span>
          </ChangeImage>
          <FormGroup>
            <Label>Name</Label>
            <Input
              placeholder='Enter your name...'
              type='text'
              name='display_name'
              value={values.display_name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Bio</Label>
            <TextArea
              name='bio'
              placeholder='Enter your bio...'
              value={values.bio}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone</Label>
            <Input
              border_color='#bdbdbd'
              placeholder_color='#828282'
              color='#e0e0e0'
              font_weight={400}
              placeholder='Enter your phone...'
              type='text'
              name='phone'
              value={values.phone}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              border_color='#bdbdbd'
              placeholder_color='#828282'
              color='#e0e0e0'
              font_weight={400}
              placeholder='Enter your email...'
              type='text'
              name='email'
              readOnly
              value={values.email}
              onChange={handleChange}
            />
          </FormGroup>
          {!user.social_id && (
            <FormGroup>
              <Label>Password</Label>
              <Input
                border_color='#bdbdbd'
                placeholder_color='#828282'
                color='#e0e0e0'
                font_weight={400}
                placeholder='Enter your password...'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          )}
          <Button type='submit'>Save</Button>
        </form>
      </Content>
    </Wrapper>
  );
};

export default EditProfileForm;
