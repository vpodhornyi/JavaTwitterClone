import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Box} from "@mui/material";
import PropTypes from "prop-types";
import {AddPhotoButton} from "../../../../components";
import HeaderPhoto from "./HeaderPhoto";

const PhotosEditor = ({formData, setFormData}) => {

  return (
      <BoxWrapper>
        <HeaderPhoto formData={formData} setFormData={setFormData}/>
        <Box className='AddPhoto'>
          <Box sx={{position: 'absolute', left: 15, bottom: -10}}>
            <Box className="AvatarWrapper">
              <Avatar className="Avatar" src={formData.avatarImageUrl}/>
              <Box sx={{position: 'absolute'}}>
                <AddPhotoButton
                    fieldUrlName={'avatarImageUrl'}
                    fieldFileName={'avatarImgFile'}
                    formData={formData}
                    setFormData={setFormData}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',

  '& .AvatarWrapper': {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,

    '& .Avatar': {
      width: '6rem',
      height: '6rem',
      border: `2px solid ${theme.palette.background.main}`,

      [theme.breakpoints.up('sm')]: {
        width: '8.5rem',
        height: '8.5rem',
        border: `5px solid ${theme.palette.background.main}`,
      },
    }
  },

  '& > .AddPhoto': {
    position: 'relative',
    borderTop: `1px solid ${theme.palette.border.main}`,
    padding: '19px 15px',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

PhotosEditor.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
}
export default PhotosEditor;
