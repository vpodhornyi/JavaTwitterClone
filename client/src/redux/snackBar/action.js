import {createActions} from '../utils';

const actions = createActions(
  {
    actions: ['OPEN_SNACK_BAR', 'CLOSE_SNACK_BAR'],
  },
  {
    prefix: 'snackBar',
  }
)

export const ACTIONS = {
  ...actions.actions,
}

export const openSnackBar = (props) => dispatch => {
  dispatch(ACTIONS.openSnackBar(props));
}

export const closeSnackBar = () => dispatch => {
  dispatch(ACTIONS.closeSnackBar());
}
