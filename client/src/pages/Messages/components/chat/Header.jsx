import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {openChatInfo} from "@redux/message/action";
import {getMessageData} from "@redux/message/selector";

const Header = () => {
  const StyledBox = styled(Box)(styles);
  const dispatch = useDispatch();
  const {user} = useSelector(getMessageData);

  return (
    <StyledBox>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: '10px'}} className='backButton'>
          <CustomIconButton name='ArrowBackOutlined' title='Back'/>
        </Box>
        <Avatar sx={{mr: '10px', width: '2.5rem', height: '2.5rem'}} src={user.avatarImgUrl}/>
        <Typography variant='h2'>{user.name}</Typography>
      </Box>
      <Box onClick={() => dispatch(openChatInfo())}>
        <CustomIconButton name='InfoOutlined' title='Details'/>
      </Box>
    </StyledBox>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,

  '& .MuiTypography-root': {
    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold
  },

  '& .backButton': {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  }
});

export default Header;
