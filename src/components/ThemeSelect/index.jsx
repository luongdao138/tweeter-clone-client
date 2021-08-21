import React, { useEffect, useState } from 'react';
import { MdRadioButtonUnchecked, MdCheckCircle, MdCheck } from 'react-icons/md';
import { useThemeContext } from '../../context/ThemeContext';
import { themes, primary_colors } from '../../helpers/theme';
import { BgItem, ColorItem, Wrapper } from './ThemeSelect.styles';

const ThemeSelect = () => {
  const { theme, setTheme } = useThemeContext();
  const [bg, setBg] = useState(theme.id);
  const [color, setColor] = useState(theme.colors.component.primary);

  useEffect(() => {
    let newTheme = themes.find((x) => x.id.toString() === bg.toString());
    newTheme.colors.component.primary = theme.colors.component.primary;
    setTheme(newTheme);
  }, [bg, theme.colors.component.primary]);

  useEffect(() => {
    let newTheme = { ...theme };
    newTheme.colors.component.primary = color;
    setTheme(newTheme);
  }, [color]);

  return (
    <Wrapper>
      <p className='title'>Custom your view</p>
      <div className='group'>
        <p className='group-title'>Color</p>
        <div className='group-color'>
          {primary_colors.map((c, index) => {
            return (
              <ColorItem
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                key={index}
              >
                {color === c && <MdCheck />}
              </ColorItem>
            );
          })}
        </div>
      </div>
      <div className='group'>
        <p className='group-title'>Background</p>
        <div className='group-bg'>
          {themes.map((theme) => {
            return (
              <BgItem
                key={theme.id}
                active={bg === theme.id}
                style={{
                  backgroundColor: theme.background.main,
                  color: theme.colors.text.light_primary,
                }}
                onClick={() => setBg(theme.id)}
              >
                {theme.id === bg ? (
                  <MdCheckCircle style={{ color: '#1DA1F2' }} />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
                <span>{theme.name}</span>
              </BgItem>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default ThemeSelect;
