import {ACTIONS} from "./action";

const INIT = {
  variant: '',
  text: '',
  open: false,
}

export default (state = INIT, {payload, type}) => {
  const {text} = payload ? payload : {
    variant: '',
    text: '',
    open: false,
  };

  switch (type) {
    case String(ACTIONS.closeSnackBar):
      return {
        ...state,
        open: false,
      }
    case String(ACTIONS.openSnackBar):
      return {
        ...state,
        open: true,
        text,
      }
    default:
      return state
  }
}
