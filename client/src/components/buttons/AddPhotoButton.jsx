import React, {useRef} from "react";
import {styled} from "@mui/material/styles";
import {Fab} from "@mui/material";
import PropTypes from "prop-types";
import {IconByName} from "../icons";

const AddPhotoButton = ({
                          setFile, setImageUrl, setDisabled,
                          fieldUrlName, fieldFileName, inputFileRef,
                          formData, setFormData
                        }) => {

  const handleFileUploader = (event) => {
    const file = event.target.files[0];

    if (file) {
      // setFile(file);
      // setImageUrl(URL.createObjectURL(file));
      // setDisabled(false);
      setFormData({
        ...formData,
        [fieldUrlName]: URL.createObjectURL(file),
        [fieldFileName]: file,
        disabled: false,
      });
    }
  }

  return (
      <FabWrapper onClick={() => inputFileRef.current.click()}>
        <input
            ref={inputFileRef}
            type="file"
            multiple
            hidden
            id="file-upload"
            onChange={handleFileUploader}
        />
        <IconByName iconStyle={{fontSize: '1.3rem'}} iconName='AddAPhotoOutlined'/>
      </FabWrapper>);
}

const FabWrapper = styled(Fab)(({theme}) => ({
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
}));

AddPhotoButton.propTypes = {
  setFile: PropTypes.func,
  setImageUrl: PropTypes.func,
  setDisabled: PropTypes.func,
  fieldUrlName: PropTypes.string,
  fieldFileName: PropTypes.string,
  inputFileRef: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
}
export default AddPhotoButton;
