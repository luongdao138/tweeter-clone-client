import React, { useRef } from 'react';
import { Wrapper, List } from './MenuReply.styles';
import { ImEarth } from 'react-icons/im';
import { FaUserFriends } from 'react-icons/fa';
import useEventListener from '../../../hooks/useEventListener';
import { useThemeContext } from '../../../context/ThemeContext';

const MenuReply = ({ onClose, buttonRef, canReply, setCanReply }) => {
  const ref = useRef();
  const { theme } = useThemeContext();
  useEventListener('mousedown', window, (e) => {
    if (
      !ref.current?.contains(e.target) &&
      !buttonRef.current?.contains(e.target)
    ) {
      onClose();
    }
  });

  const handleSetCanReply = (value) => {
    setCanReply(value);
    onClose();
  };

  return (
    <Wrapper ref={ref}>
      <p className='title'>Who can reply</p>
      <p className='sub-title'>Choose who can reply</p>
      <List>
        <li
          onClick={() => handleSetCanReply('EVERYONE')}
          style={{
            backgroundColor: canReply === 'EVERYONE' && theme.background.main,
          }}
        >
          <ImEarth />
          <span>Everyone</span>
        </li>
        <li
          onClick={() => handleSetCanReply('FOLLOW')}
          style={{
            backgroundColor: canReply === 'FOLLOW' && theme.background.main,
          }}
        >
          <FaUserFriends />
          <span>People you follow</span>
        </li>
      </List>
    </Wrapper>
  );
};

export default MenuReply;
