import React from "react";
import {styled} from "@mui/material/styles";
import {Box, TextField} from "@mui/material";
import PropTypes from "prop-types";

import PhotosEditor from "./PhotosEditor";

const FormElement = ({formData, setFormData}) => {

  const onChangeName = e => {
    const text = e.target.value.trim();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      disabled: false
    });
  }

  return (
      <BoxWrapper>
        <PhotosEditor formData={formData} setFormData={setFormData}/>
        <Box className='GroupNameFieldWrapper'>
          <TextField
              color='primary'
              sx={{width: '100%', mb: 4}}
              onChange={e => onChangeName(e)}
              value={formData.name}
              id="name"
              label="Name"
              variant="outlined"/>
          <TextField
              color='primary'
              sx={{width: '100%', mb: 4}}
              onChange={e => onChangeName(e)}
              value={formData.bio}
              id="bio"
              multiline={true}
              rows={3}
              label="Bio"
              variant="outlined"/>
          <TextField
              color='primary'
              sx={{width: '100%', mb: 4}}
              onChange={e => onChangeName(e)}
              value={formData.location}
              id="location"
              label="Location"
              variant="outlined"/>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',

  '& > .GroupNameFieldWrapper': {
    width: '100%',
    padding: '11px 15px',

    '& .MuiInputBase-input': {
      color: theme.palette.text.main,
    },

    '& .MuiFormLabel-root': {
      color: theme.typography.subtitle1.color,
    },

    '& .MuiInputBase-root': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.typography.subtitle1.color,
      }
    },

    '& .Mui-focused': {
      color: theme.palette.primary.main,

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      }
    },
  }
}));

FormElement.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
}
export default FormElement;