import React from "react";
import {Link, useLocation} from "react-router-dom";

import {PATH} from "@utils/constants";
import {styled} from "@mui/material/styles";
import {Box, ImageList, ImageListItem} from "@mui/material";
import PropTypes from "prop-types";

const ImagesBox = ({tweet}) => {
  const {user, images} = tweet;
  const location = useLocation();

  return <BoxWrapper onClick={e => e.stopPropagation()}>
    <Link
      className="ImagesLink"
      state={{background: location, tweet}}
      to={PATH.USER.tweet_photos(user?.userTag, user?.id, 1)}
    >
      <ImageList sx={{width: 500, height: 450}} cols={images.length === 1 ? 1 : 2} rowHeight={164}>
        {images.map((item) => (
          <ImageListItem key={item.imgUrl} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              srcSet={`${item.imgUrl}`}
              src={`${item.imgUrl}`}
              loading="lazy"
              alt="image"
            />
          </ImageListItem>))}
      </ImageList>
    </Link>
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  borderRadius: '16px',
  '.ImagesLink': {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',

    '& img': {
      marginTop: 12,
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

