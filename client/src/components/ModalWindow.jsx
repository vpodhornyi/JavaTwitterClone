import React from "react";
import {Box, Modal} from "@mui/material";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";

const ModalWindow = ({modal, toggleModal}) => {
  return (
    <StyledModal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...modal?.style
      }}
      onClick={() => toggleModal()}
      onClose={() => toggleModal()}
      open={modal?.isShowing}>
      <Box sx={{
        '&:focus-visible': {
          outline: 'none',
        }
      }}
           onClick={e => e.stopPropagation()}>
        {modal?.element}
      </Box>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)(({theme}) => ({
  backgroundColor: 'rgba(91, 112, 131, 0.4)',
}));

ModalWindow.propTypes = {
  modal: PropTypes.object,
  toggleModal: PropTypes.func,
}
export default ModalWindow;
