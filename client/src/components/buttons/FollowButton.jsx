import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

import { UnfollowConfirm } from "@components";
import { followUser } from "@redux/user/action";
import { Context } from "@utils/context";
import { CustomFabButton } from "./.";

const FollowButton = ({
                        isFollowing = false,
                        name = 'Follow',
                        disabled = false,
                        userId,
                        userTag,
                      }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useContext(Context);

  const click = () => {
    if (isFollowing) {
      toggleModal(<UnfollowConfirm
          toggleModal={toggleModal}
          userId={userId}
          userTag={userTag}
      />, true);
    } else {
      dispatch(followUser(userId));
    }
  }

  return (
      <BoxWrapper onClick={click}>
        <CustomFabButton
            className={`${disabled ? 'Disabled' : ''} ${isFollowing ? 'FollowingClass' : ''}`}
            name={isFollowing ? 'Following' : name}
            disabled={disabled}
        />
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({ theme }) => ({
  '& .MuiFab-root': {
    height: '2.2rem',
    backgroundColor: theme.palette.text.main,
    border: `1px solid ${theme.palette.text.main}`,
    margin: '10px 0',
    transitionDuration: '0.2s',

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '0.95rem',
      color: theme.palette.text.secondary,
    },

    '&:hover': {
      backgroundColor: theme.palette.text.third,
    },
  },

  '& .FollowingClass': {
    width: '90px',
  },

  '& .FollowingClass:hover': {
    backgroundColor: theme.palette.redAccent.light,
    border: `1px solid ${theme.palette.redAccent.secondary}`,

    '& .CustomFabButtonName': {
      color: theme.palette.redAccent.secondary
    }
  },

  '& .FollowingClass:hover span': {
    display: 'none',
  },

  '& .FollowingClass:hover:before': {
    content: '"Unfollow"',
    color: theme.palette.redAccent.secondary
  },

  '& .Disabled': {
    opacity: 0.6
  },
}));

FollowButton.propTypes = {
  isFollowing: PropTypes.bool,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  userId: PropTypes.number,
  userTag: PropTypes.string,
}
export default FollowButton;
