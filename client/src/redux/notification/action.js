import {createActions} from "../utils";
import api, {URLS} from '../../services/API';
import {ACTIONS as SNACK_ACTIONS} from "../snack/action";

const actions = createActions(
  {
    actions: [
      'SET_PAGE_NUMBER',
      'ADD_NOTIFICATION',
      'RESET_GET_NOTIFICATIONS'
    ],
    async: [
      'GET_NOTIFICATIONS'
    ]
  },
  {
    prefix: 'notification'
  }
)

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
}

export const getNotifications = () => async (dispatch, getState) => {
  try {
    const {notification: {pageNumber, pageSize}} = getState();
    const params = {pageNumber, pageSize};
    dispatch(ACTIONS.getNotifications.request());
    const data = await api.get(URLS.NOTIFICATIONS.ROOT, {params});

    if (data?.elements.length > 0) dispatch(ACTIONS.setPageNumber({pageNumber: pageNumber + 1}));

    dispatch(ACTIONS.getNotifications.success(data));

  } catch (err) {
    dispatch(ACTIONS.getNotifications.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
}