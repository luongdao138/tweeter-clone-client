import React from 'react';
import { IoMdCompass } from 'react-icons/io';
import { MdHome, MdBookmark } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MenuItem, Wrapper } from './SmallScreenMenu.styles';

const SmallScreenMenu = () => {
  return (
    <Wrapper>
      <ul>
        <MenuItem>
          <Link to='/'>
            <MdHome />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/explore'>
            <IoMdCompass />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/bookmark'>
            <MdBookmark />
          </Link>
        </MenuItem>
      </ul>
    </Wrapper>
  );
};

export default SmallScreenMenu;
