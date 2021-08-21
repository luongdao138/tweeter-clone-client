import Logo from '../assets/devchallenges.svg';
import { MdEmail, MdLock } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Content,
  Error,
  FormGroup,
  Social,
  Wrapper,
  Input,
  Icon,
} from './styles/auth.styles';
import { useState } from 'react';
import SocialAuth from '../components/SocialAuth';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import axiosClient from '../api/axiosClient';
import useSignin from '../hooks/useSignin';
import LoadingPage from './LoadingPage';
import { useThemeContext } from '../context/ThemeContext';

const SignupPage = () => {
  const history = useHistory();
  const { theme } = useThemeContext();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    password: '',
    email: '',
    display_name: '',
  });
  const { loading } = useSignin();

  if (loading) return <LoadingPage />;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient().post('/auth/signup', values);
      localStorage.setItem('tweeter_token', res.data.token);
      history.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError('Oops! Something went wrong!');
      }
    }
  };

  return (
    <Wrapper>
      <Content>
        <img src={Logo} alt='' />
        <p className='title'>
          Join thousands of learners from around the world
        </p>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Icon>
              <FaUser />
            </Icon>
            <Input
              placeholder='Username'
              name='display_name'
              value={values.display_name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Icon>
              <MdEmail />
            </Icon>
            <Input
              placeholder='Email'
              name='email'
              value={values.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Icon>
              <MdLock />
            </Icon>
            <Input
              placeholder='Password'
              type='password'
              icon
              name='password'
              value={values.password}
              onChange={handleChange}
            />
          </FormGroup>
          {error && <Error>{error}</Error>}
          <Button>Start coding now</Button>
        </form>
        {/* <Social>
          <p className='sub-title'>or continue with these social profile</p>
          <div className='icon_wrapper'>
            <SocialAuth />
          </div>
        </Social> */}
        <p
          className='sub-title'
          style={{ marginTop: '15px', textAlign: 'center' }}
        >
          Already a member?{' '}
          <Link to='/login' style={{ color: theme.colors.component.primary }}>
            Login
          </Link>
        </p>
      </Content>
    </Wrapper>
  );
};

export default SignupPage;
