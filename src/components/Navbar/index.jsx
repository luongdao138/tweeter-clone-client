import React, { useEffect, useRef, useState } from 'react';
import { Content, Wrapper, Button, MenuLink } from './Navbar.styles';
import Tweeter from '../../assets/tweeter.svg';
import { Link, useLocation } from 'react-router-dom';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import Menu from '../NavMenu';
import { useDispatch, useSelector } from 'react-redux';
import no_user from '../../assets/no_user.png';
import { MdNotifications } from 'react-icons/md';
import NotificationModal from '../NotificationModal';
import { resetNotifications } from '../../api/notification';
import { reset_nof } from '../../features/auth/authSlice';

const Navbar = () => {
  const buttonRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedPage, setSelectedPage] = useState('/');
  const location = useLocation();
  const [openNotification, setOpenNotification] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location]);

  const handleResetNotifications = async () => {
    await resetNotifications();
    dispatch(reset_nof());
  };

  return (
    <Wrapper>
      <NotificationModal
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      />
      <Content>
        <Link to='/'>
          <img src={Tweeter} alt='' />
        </Link>
        <ul className='nav-menu'>
          <MenuLink active={selectedPage === '/'}>
            <Link to='/'>Home</Link>
          </MenuLink>
          <MenuLink active={selectedPage === '/explore'}>
            <Link to='/explore'>Explore</Link>
          </MenuLink>
          <MenuLink active={selectedPage === '/bookmark'}>
            <Link to='/bookmark'>Bookmarks</Link>
          </MenuLink>
        </ul>
        <Button>
          <button
            className='button'
            onClick={() => {
              setOpenMenu((x) => !x);
            }}
            ref={buttonRef}
          >
            <img src={user.photo || no_user} alt='' />
            <span>{user.display_name}</span>
            {!openMenu ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          {openMenu && (
            <Menu
              buttonRef={buttonRef}
              onClose={() => {
                setOpenMenu(false);
              }}
            />
          )}
          <span
            className='not'
            onClick={() => {
              handleResetNotifications();
              setOpenNotification(true);
            }}
          >
            <MdNotifications />
            {user.notifications_count > 0 && (
              <span className='badge'>
                <span>{user.notifications_count}</span>
              </span>
            )}
          </span>
        </Button>
      </Content>
    </Wrapper>
  );
};

export default Navbar;
