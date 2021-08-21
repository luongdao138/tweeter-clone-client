import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Wrapper,
  Content,
  Footer,
  Header,
  ProfileContainer,
} from './styles/setting.styles';
import no_user from '../assets/no_user.png';
import { useThemeContext } from '../context/ThemeContext';
import ThemeSelect from '../components/ThemeSelect';

const SettingPage = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useThemeContext();

  return (
    <Wrapper>
      <p className='main-title'>Personal Info</p>
      <p className='subtitle'>Basic info, like your name and photo</p>
      <ProfileContainer>
        <ThemeSelect />
        <Header>
          <div className='title'>
            <p className='big'>Profile</p>
            <p className='small'>Some info maybe visible to other people</p>
          </div>
          <button onClick={() => history.push('/setting/edit')}>Edit</button>
        </Header>
        <Content>
          <li>
            <span className='title'>Photo</span>
            <span className='value'>
              <img src={user.photo || no_user} alt='' />
            </span>
          </li>
          <li>
            <span className='title'>Name</span>
            <span className='value'>{user.display_name}</span>
          </li>
          <li>
            <span className='title'>Bio</span>
            <span className='value'>{user.bio}</span>
          </li>
          <li>
            <span className='title'>Phone</span>
            <span className='value'>{user.phone}</span>
          </li>
          <li>
            <span className='title'>Email</span>
            <span className='value'>{user.email}</span>
          </li>
          <li>
            <span className='title'>Password</span>
            <span className='value'>**********</span>
          </li>
        </Content>
      </ProfileContainer>
      <Footer>
        <span className='username'>
          Created by{' '}
          <Link
            style={{
              color: theme.colors.component.primary,
              textDecoration: 'underline',
            }}
            to='/'
          >
            Luongdao
          </Link>
        </span>
        <span className='dev'>devChallenges.io</span>
      </Footer>
    </Wrapper>
  );
};

export default SettingPage;
