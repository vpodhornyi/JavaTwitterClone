import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import {closeSnackBar} from "@redux/snackBar/action";
import {getSnackBarState} from "@redux/snackBar/selector";


const SnackBar = () => {
  const {open, text} = useSelector(getSnackBarState);
  const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(closeSnackBar());
  };

  return (
    <Snackbar
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={text}
    />
  );
}

export default SnackBar;
