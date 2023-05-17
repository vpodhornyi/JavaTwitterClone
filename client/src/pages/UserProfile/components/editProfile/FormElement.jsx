import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {Box, TextField} from "@mui/material";
import PropTypes from "prop-types";

import BirthDate from "./BirthDate";
import PhotosEditor from "./PhotosEditor";

const FormElement = ({user, formData, setFormData}) => {
  const [editBirthDate, setEditBirthDate] = useState(false);


  const onChange = e => {
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
              onChange={e => onChange(e)}
              value={formData.name}
              id="name"
              label="Name"
              variant="outlined"/>
          <TextField
              color='primary'
              sx={{width: '100%', mb: 4}}
              onChange={e => onChange(e)}
              value={formData.bio}
              id="bio"
              multiline={true}
              rows={3}
              label="Bio"33
              variant="outlined"/>
          <TextField
              color='primary'
              sx={{width: '100%', mb: 4}}
              onChange={e => onChange(e)}
              value={formData.location}
              id="location"
              label="Location"
              variant="outlined"/>
          <BirthDate
              date={user.birthDate}
              formData={formData}
              setFormData={setFormData}
              editBirthDate={editBirthDate}
              setEditBirthDate={setEditBirthDate}
              onChangeDate={onChange}
          />
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
  user: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
}
export default FormElement;
