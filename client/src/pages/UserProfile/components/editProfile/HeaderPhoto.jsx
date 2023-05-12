import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {AddPhotoButton} from "../../../../components";

const HeaderPhoto = ({formData, setFormData}) => {
  return (
      <BoxWrapper>
        {formData.headerImageUrl && <img className="HeaderImg" src={formData.headerImageUrl} alt=""/>}
        <Box className="HeaderButtonsWrapper">
          <AddPhotoButton
              fieldUrlName={'headerImageUrl'}
              fieldFileName={'headerImgFile'}
              formData={formData}
              setFormData={setFormData}/>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  height: '200px',
  backgroundColor: theme.palette.background[2],
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .HeaderImg': {
    height: '200px',
    width: '100%'
  },

  '& .HeaderButtonsWrapper': {
    position: 'absolute',
  }
}));

HeaderPhoto.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
}
export default HeaderPhoto;
