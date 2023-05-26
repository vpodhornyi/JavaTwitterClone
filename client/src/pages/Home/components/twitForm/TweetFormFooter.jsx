import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

import {CustomFabButton, CustomIconButton} from "../../../../components"

const TweetFormFooter = () => {

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
        <CustomFabButton disabled={true} className='TweetButton' name='Tweet'/>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',

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

export default TweetFormFooter;
