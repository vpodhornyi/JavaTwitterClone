import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Typography } from "@mui/material";
import { getChatsData } from "@redux/chat/selector";
import { PATH } from "@utils/constants";

import {moment} from "@utils";

const UserInfo = () => {
  const { selectedChat } = useSelector(getChatsData);
  const { guestUser } = selectedChat;

  return (
      <Link to={PATH.USER.profile(selectedChat.userTag)} style={{ textDecoration: 'none', color: '#000000' }}>
        <BoxWrapper>
          <Avatar sx={{ width: '5rem', height: '5rem', marginBottom: '5px' }} src={selectedChat.avatarImgUrl}/>
          <Typography sx={{ fontWeight: 600 }}>{selectedChat.title}</Typography>
          <Typography variant='body2' sx={{ pb: 2 }}>@{selectedChat.userTag}</Typography>
          <Typography variant='body2'>{`
            Joined ${moment(guestUser.createdAt).format('MMMM YYYY')} ·
             ${guestUser.followersCount} 
             Follower${guestUser.followersCount === 1 ? '' : 's'}
          `}</Typography>
          {/*<Typography variant='body2'>User Tag</Typography>*/}
        </BoxWrapper>
      </Link>
  );
}

const styles = ({ theme }) => ({
  paddingTop: 70,
  paddingBottom: 50,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.border.main}`,
  marginBottom: 15,

  '&:hover': {
    backgroundColor: theme.palette.background[1],
    transition: '0.5s',
  }
});

const BoxWrapper = styled(Box)(styles);

export default UserInfo;
