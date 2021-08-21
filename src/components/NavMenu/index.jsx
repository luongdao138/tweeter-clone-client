import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdExitToApp, MdGroup } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { Divider, List, Wrapper } from './NavMenu.styles';
import useEventListener from '../../hooks/useEventListener';
import { IoMdSettings } from 'react-icons/io';
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useThemeContext } from '../../context/ThemeContext';

const NavMenu = ({ onClose, buttonRef }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useThemeContext();
  useEventListener('mousedown', window, (e) => {
    if (
      !ref.current?.contains(e.target) &&
      !buttonRef.current?.contains(e.target)
    ) {
      onClose();
    }
  });

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Wrapper ref={ref}>
      <List>
        <li>
          <Link to={`/profile/${user._id}`}>
            <FaUserCircle />
            <span>My profile</span>
          </Link>
        </li>
        <li>
          <Link to='/chat'>
            <MdGroup />
            <span>Group Chat</span>
          </Link>
        </li>
        <li>
          <Link to='/setting'>
            <IoMdSettings />
            <span>Settings</span>
          </Link>
        </li>
        <Divider />
        <li>
          <Link
            to='/'
            style={{ color: theme.colors.component.primary }}
            onClick={handleLogout}
          >
            <MdExitToApp />
            <span>Logout</span>
          </Link>
        </li>
      </List>
    </Wrapper>
  );
};

export default NavMenu;
