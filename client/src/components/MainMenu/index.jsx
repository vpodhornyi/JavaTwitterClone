import React from "react";
import {styled} from "@mui/material/styles";
import {NavLink, Route} from "react-router-dom";
import MainMenuButton from "./MainMenuButton";
import PropTypes from "prop-types";
import {getMenuItems} from '../../routes';

const MainMenu = ({authorized}) => {
  const menuItems = getMenuItems(authorized);

  return (
    <MainMenuNav>
      {menuItems.map(({path, text, iconName, iconActive}) => (
        <NavLink key={path} to={path} style={{textDecoration: 'none'}}>
          {({isActive}) => (
            <MainMenuItem>
              <MainMenuButton
                isActive={isActive}
                iconName={isActive ? iconActive : iconName}
                text={text}/>
            </MainMenuItem>
          )}
        </NavLink>
      ))}
      {authorized &&
        <MainMenuItem>
          <MainMenuButton
            isActive={false}
            iconName='MoreHoriz'
            text='More'/>
        </MainMenuItem>
      }
    </MainMenuNav>
  );
}

export const MainMenuNav = styled('nav')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',

  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    position: 'relative',
  },
}));

export const MainMenuItem = styled('div')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  color: theme.palette.action.active,

  '&:hover .MainMenuButton': {
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  }
}));

MainMenu.propTypes = {
  authorized: PropTypes.bool,
}

export default MainMenu;
