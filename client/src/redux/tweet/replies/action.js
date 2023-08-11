import {createActions} from "../../utils";
import api, {URLS} from "../../../services/API";
import {ACTIONS as SNACK_ACTIONS} from "../../snack/action";

const actions = createActions(
    {
      actions: [
        'SET_PAGE_NUMBER',
        'RESET',
      ],
      async: [
        'GET_TWEET_REPLIES',
      ],
    },
    {
      prefix: "replies",
    }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.async,
};

export const getTweetReplies = (id) => async (dispatch, getState) => {
  try {
    const {replies: {pageNumber, pageSize}} = getState();
    dispatch(ACTIONS.getTweetReplies.request());
    const data = await api.get(URLS.TWEETS.getTweetReplies(id), {params: {pageNumber, pageSize}});

    if (data?.elements.length > 0) dispatch(ACTIONS.setPageNumber({pageNumber: pageNumber + 1}));

    dispatch(ACTIONS.getTweetReplies.success(data));

  } catch (err) {
    dispatch(ACTIONS.getTweetReplies.fail());
    dispatch(SNACK_ACTIONS.open(err?.response?.data));
  }
};