import React from "react";
import {useSelector} from 'react-redux';
import {MenuList} from "@mui/material";
import MenuItemLink from "./MenuItemLink";
import CustomMenuItem from "@components/navigations/CustomMenuItem";
import {getMainMenuState} from "@redux/business/menu/mainMenu/selector";
import {styled} from "@mui/material/styles";

const MainMenu = () => {
  const isMatchesUrl = href => href.split('/').pop() === window.location.href.split('/').pop();
  const {navItems, more: {iconName, text}} = useSelector(getMainMenuState);
  const StyledMenuList = styled(MenuList)(styles);

  return (
    <StyledMenuList>
      {navItems.map(({text, iconName, iconActive, href}) => (
        <MenuItemLink
          key={text}
          iconName={isMatchesUrl(href) ? iconActive : iconName}
          text={text}
          textStyle={isMatchesUrl(href) ? {fontWeight: 600} : {}}
          href={href}/>)
      )}
      <CustomMenuItem iconName={iconName} text={text}></CustomMenuItem>
    </StyledMenuList>
  );
}

const styles = ({theme}) => ({
  display: 'flex',
  flexDirection: 'row',

  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    position: 'relative',
  },
})

export default MainMenu;
