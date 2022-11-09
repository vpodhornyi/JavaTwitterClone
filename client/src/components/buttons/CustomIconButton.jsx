import React from "react";
import IconsByName from "@components/icons/IconByName";
import {IconButton, Tooltip} from "@mui/material";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";

const CustomIconButton = ({name, title}) => {
  const StyledIconButton = styled(IconButton)(styles);
  return (
    <Tooltip title={title}>
      <StyledIconButton>
        <IconsByName iconName={name}/>
      </StyledIconButton>
    </Tooltip>
  )
};

CustomIconButton.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
}

const styles = ({theme}) => ({
  '& .MuiTouchRipple-root': {
    display: 'none'
  },
});

export default CustomIconButton;
