import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const Message = ({left}) => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper className={left ? 'LeftMessage' : 'RightMessage'}>
      <Typography>ecwec wcecw fwfwe sdfsf sdfsdf  wwwwwwwwwwwwwwwwwwwwwwwf sdfsdf sfsd f s fd s df s df  sd f sd f s df s f</Typography>
    </BoxWrapper>);
}

Message.propTypes = {
  left: PropTypes.bool,
}

const styles = ({theme}) => ({
  flexShrink: 1,
  padding: '11px 15px',
  borderRadius: 24,

  '& .MuiTypography-root': {
    wordWrap: 'break-word',
    minWidth: 0,
  }
});

export default Message;
