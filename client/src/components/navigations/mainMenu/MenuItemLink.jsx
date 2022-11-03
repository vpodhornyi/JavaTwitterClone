import React from "react";
// import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import CustomMenuItem from "../CustomMenuItem";


const MenuItemLink = ({iconName, text, href, iconStyle, textStyle}) => (
  <Link to={href} style={{ textDecoration: 'none' }} className="item-link">
    <CustomMenuItem iconName={iconName} text={text} iconStyle={iconStyle} textStyle={textStyle}/>
  </Link>
);

MenuItemLink.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  href: PropTypes.string,
  iconStyle: PropTypes.object,
  textStyle: PropTypes.object,
}

export default MenuItemLink;
