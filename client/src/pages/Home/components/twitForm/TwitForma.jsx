import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box} from "@mui/material";
import PropTypes from "prop-types";

import TweetFormFooter from "./TweetFormFooter";
import {Link} from "react-router-dom";
import {PATH} from "../../../../utils/constants";

const TwitForma = ({item}) => {
  const {authUser: user} = useSelector(state => state.user);

  return (
      <BoxWrapper>
        <Link
            to={PATH.USER.profile(user.userTag)}
            state={{background: location}}
            className="AvatarLink">
          <Avatar className="Avatar" src={user.avatarImgUrl}/>
        </Link>
        <Box className="TweetFormWrapper">
          <Box>
            Twit forma
          </Box>
          <TweetFormFooter/>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  padding: '0 16px',

  '& .AvatarLink': {
    marginRight: '12px',
    height: '50px',
  },

  '& .Avatar': {
    width: '50px',
    height: '50px',
  },

  '& .TweetFormWrapper' : {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

  },

  borderBottom: `1px solid ${theme.palette.border.main}`,
}));

TwitForma.propTypes = {
  item: PropTypes.object,
}

export default TwitForma;
