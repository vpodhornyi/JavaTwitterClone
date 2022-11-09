import React from "react";

import {Link} from "react-router-dom";
import CustomMenuItem from "../CustomMenuItem";
import PropTypes from "prop-types";

const MenuItemLink = ({iconName, text, href, iconStyle, textStyle}) => {
  return (
    <Link to={href} style={{textDecoration: 'none'}}>
      <CustomMenuItem iconName={iconName} text={text} iconStyle={iconStyle} textStyle={textStyle}/>
    </Link>
  );
}

MenuItemLink.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  href: PropTypes.string,
  iconStyle: PropTypes.object,
  textStyle: PropTypes.object,
}

export default MenuItemLink;
