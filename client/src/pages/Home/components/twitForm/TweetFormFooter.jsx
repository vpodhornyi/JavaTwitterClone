import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, IconButton} from "@mui/material";
import PropTypes from "prop-types";

import {CustomFabButton, CustomIconButton, IconByName} from "../../../../components"

const TweetFormFooter = ({item}) => {
  const dispatch = useDispatch();

  return (
      <BoxWrapper>
        <Box className="IconsBox">
          <Box>
            <CustomIconButton color='primary' name='InsertPhotoOutlined' iconSize='small'/>
          </Box>
          <Box>
            <CustomIconButton color='primary' name='GifBoxOutlined' iconSize='small'/>
          </Box>
          <Box>
            <CustomIconButton color='primary' name='SentimentSatisfiedAltOutlined' iconSize='small'/>
          </Box>
        </Box>

        <CustomFabButton disabled={false} className='TweetButton' name='Tweet'/>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderTop: `1px solid ${theme.palette.border.main}`,

  '& .IconsBox': {
    display: 'flex'
  },

  '& .TweetButton': {
    backgroundColor: theme.palette.primary.main,
    height: '38px',

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.common.textWhite,
    }
  }
}));

TweetFormFooter.propTypes = {
  item: PropTypes.object,
}
export default TweetFormFooter;
