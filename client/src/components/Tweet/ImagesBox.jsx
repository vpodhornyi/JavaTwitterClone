import React from "react";
import {Link, useLocation} from "react-router-dom";

import {PATH} from "@utils/constants";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const ImagesBox = ({tweet}) => {
  const {user, images} = tweet;
  const location = useLocation();

  return <BoxWrapper onClick={e => e.stopPropagation()}>
    <Link
      className="ImagesLink"
      state={{ background: location }}
      to={PATH.USER.tweet_photos(user?.userTag, user?.id, 1)}
    >
      {images.length > 0 && images.map((item, i) => <img key={item.key} src={item.imgUrl} alt=""/>)}
    </Link>
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '.ImagesLink': {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',

    '& img': {
      marginTop: 12,
      borderRadius: '16px',
      maxWidth: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  }
}));

ImagesBox.propTypes = {
  tweet: PropTypes.object,
  inViewCheck: PropTypes.bool,
}

export default ImagesBox;

