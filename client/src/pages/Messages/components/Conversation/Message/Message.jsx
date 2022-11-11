import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

const Message = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Typography>ecwec wcecw fwfwe sdfsf sdfsdf sdfsdwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwwf sdfsdf sfsd f s fd s df s df  sd f sd f s df s f</Typography>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  flexShrink: 1,
  padding: '11px 15px',
  borderRadius: 24,
  borderBottomRightRadius: 4,
  backgroundColor: '#1d9bf0',

  '& .MuiTypography-root': {
    wordWrap: 'break-word',
    minWidth: 0,
  }
});

export default Message;
