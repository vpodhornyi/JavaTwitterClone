import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";

import UserPhotoBlock from "./UserPhotoBlock";
import DateInfo from "./DateInfo";
import TwittersLists from "./TwittersLists";
import { IconByName } from "@components";
import { PATH } from "@utils/constants";
import {URLS} from "@services/API";
import {findByUserTag} from "@redux/user/action";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { guestUser: user } = useSelector(state => state.user);
  const location = useLocation();

  useEffect(() => {
    dispatch(findByUserTag(URLS.USERS.getProfile(location.pathname)));
  }, [])

  return (
      <BoxWrapper>
        {
          user.headerImgUrl === '' ? <Box className="HeaderPhotoWrapper"></Box> :
              <Link
                  to={PATH.USER.header_photo(user.userTag)}
                  state={{ background: location }}
                  className="HeaderImgLink">
                <img className="HeaderImg" src={user.headerImgUrl} alt=""/>
              </Link>
        }
        <Box className="UserInfoBlock" sx={{ p: 2 }}>
          <UserPhotoBlock user={user}/>
          <Typography fontWeight='bold' variant="h2">{user.name}</Typography>
          <Typography variant='subtitle1' sx={{ pb: 1 }}>@{user.userTag}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', mb: 1 }}>
            {user?.location &&
                <Box className="Location" sx={{ mr: 2 }}>
                  <IconByName iconName={'LocationOn'}/>
                  <Typography variant="subtitle1" sx={{ ml: 0.5 }}>{user?.location}</Typography>
                </Box>
            }
            <DateInfo title="Born" date={user?.birthDate} icoName="Cake"/>
            <DateInfo title="Joined" date={user?.createdAt} icoName="CalendarMonth"/>
          </Box>
          <Typography>{user?.bio}</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2 }} variant='subtitle1'>
              <span className='FollowCount'>{user.followingsCount}</span>
              Following
            </Typography>
            <Typography variant='subtitle1'>
              <span className='FollowCount'>{user.followersCount}</span>
              {`Follower${user.followersCount === 1 ? '' : 's'}`}
            </Typography>
          </Box>
        </Box>
        <TwittersLists user={user}/>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',

  '& .HeaderImgLink': {
    '& .HeaderImg': {
      height: '200px',
      width: '100%',
      objectFit: 'cover'
    },
  },

  '& .HeaderPhotoWrapper': {
    height: '200px',
    backgroundColor: theme.palette.background[2],
  },

  '& .UserInfoBlock': {
    '& .Location': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      color: 'inherit',

      '& .IconByName': {
        color: theme.typography.subtitle1.color,
      }
    }
  },

  '& .FollowCount': {
    color: theme.palette.text.main,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: 5,
  }
}));

UserInfo.propTypes = {
  item: PropTypes.object,
}
export default UserInfo;
