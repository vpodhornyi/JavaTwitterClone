import React, {useRef} from "react";
import {styled} from "@mui/material/styles";
import {Box, Fab} from "@mui/material";
import PropTypes from "prop-types";
import {AddPhotoButton, IconByName} from "../../../../components";

const HeaderPhoto = ({formData, setFormData}) => {
  const inputFileRef = useRef();
  const deleteHeaderImg = () => {
    inputFileRef.current.value = null;
    setFormData({
      ...formData,
      headerImgUrl: '',
      headerImgFile: null,
      disabled: false
    })
  }

  return (
      <BoxWrapper>
        {formData.headerImgUrl && <img className="HeaderImg" src={formData.headerImgUrl} alt=""/>}
        <Box className="HeaderButtonsWrapper">
          <AddPhotoButton
              fieldUrlName={'headerImgUrl'}
              fieldFileName={'headerImgFile'}
              inputFileRef={inputFileRef}
              formData={formData}
              setFormData={setFormData}/>
          {formData.headerImgUrl &&
              <Fab className="DeleteButton" onClick={deleteHeaderImg}>
                <IconByName iconStyle={{fontSize: '1.3rem'}} iconName='Clear'/>
              </Fab>
          }
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
    width: '100%',
    objectFit: 'cover'
  },

  '& .HeaderButtonsWrapper': {
    position: 'absolute',
  },

  '& .DeleteButton': {
    marginLeft: '30px',
    textTransform: 'none',
    boxShadow: 'none',
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgba(15, 20, 25, 0.60)',
    height: '3rem',
    width: '3rem',

    '&:active': {
      boxShadow: 'none',
    },

    '&:hover': {
      backgroundColor: 'rgba(39, 44, 48, 0.50)',
    },

    '& .MuiTouchRipple-root': {
      display: 'none'
    }
  }
}));

HeaderPhoto.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
}
export default HeaderPhoto;
