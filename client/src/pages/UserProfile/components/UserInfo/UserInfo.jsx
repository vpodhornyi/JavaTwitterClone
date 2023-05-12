import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import UserPhotoBlock from "./UserPhotoBlock";
import DateInfo from "./DateInfo";

const UserInfo = () => {
  const dispatch = useDispatch();
  const {authUser: user} = useSelector(state => state.user);

  return (
      <BoxWrapper>
        <Box className="HeaderPhotoWrapper">
          {user.headerImgUrl !== '' && <img className="HeaderImg" src={user.headerImgUrl} alt=""/>}
        </Box>
        <Box className="UserInfoBlock" sx={{p: 2}}>
          <UserPhotoBlock user={user}/>
          <Typography fontWeight='bold' variant="h2">{user.name}</Typography>
          <Typography variant='subtitle1' sx={{pb: 1}}>@{user.userTag}</Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', mb: 1}}>
            <DateInfo title="Born" date={user?.birthDate} icoName="Cake"/>
            <DateInfo title="Joined" date={user?.createdAt} icoName="CalendarMonth"/>
          </Box>
          <Typography>{user?.bio}</Typography>
          <Box sx={{display: 'flex'}}>
            <Typography sx={{mr: 2}} variant='subtitle1'>
              <span className='FollowCount'>{4}</span>
              Following
            </Typography>
            <Typography variant='subtitle1'>
              <span className='FollowCount'>{1}</span>
              Follower
            </Typography>
          </Box>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  // display: 'flex',

  '& .HeaderPhotoWrapper': {
    height: '200px',
    backgroundColor: theme.palette.background[2],

    '& .HeaderImg': {
      height: '200px',
      width: '100%'
    },
  },

  '& .UserInfoBlock': {
    height: '300px',
    borderBottom: `1px solid ${theme.palette.border.main}`,
  },

  '& .FollowCount': {
    fontWeight: theme.typography.fontWeightBold,
    marginRight: 5,
  }
}));

UserInfo.propTypes = {
  item: PropTypes.object,
}
export default UserInfo;
