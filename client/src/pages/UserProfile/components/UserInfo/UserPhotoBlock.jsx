import React from "react";
import {Link, useLocation} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box} from "@mui/material";
import {CustomFabButton} from "../../../../components"
import PropTypes from "prop-types";

import {PATH} from "@utils/constants";

const UserPhotoBlock = ({user}) => {
  const location = useLocation();

  return (
      <BoxWrapper>
        <Link className="UserPhotoLink" to={PATH.USER.photo(user.userTag)}>
          <Avatar className="Avatar" src={user.avatarImgUrl}/>
        </Link>
        <Link
            to={PATH.SETTINGS.PROFILE}
            state={{background: location}}
        >
        <CustomFabButton name="Edit profile" className="EditProfile"/>
        </Link>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: '70px',
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
  borderRadius: 100,

  '& .UserPhotoLink': {
    position: 'absolute',
    left: 5,
    bottom: 38,

    [theme.breakpoints.up('sm')]: {
      bottom: 27,
    },

    [theme.breakpoints.up('lg')]: {
      bottom: 17,
    },

    '& .Avatar': {
      width: '90px',
      height: '90px',
      borderRadius: 100,
      border: `2px solid ${theme.palette.background.main}`,

      [theme.breakpoints.up('sm')]: {
        width: '110px',
        height: '110px',
        border: `4px solid ${theme.palette.background.main}`,
      },

      [theme.breakpoints.up('lg')]: {
        width: '130px',
        height: '130px',
      },
    }
  },

  '& .EditProfile': {
    backgroundColor: theme.palette.background.main,
    height: '36px',
    border: `1px solid ${theme.palette.border.main}`,

    '&:hover': {
      backgroundColor: theme.palette.background[1],
    },

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold
    }
  }

}));

UserPhotoBlock.propTypes = {
  user: PropTypes.object,
}
export default UserPhotoBlock;
