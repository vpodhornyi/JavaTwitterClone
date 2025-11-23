import {createActions} from '../utils';

const actions = createActions(
  {
    actions: ['SET_SEARCH_TEXT', 'SET_FOUNDED_USERS', 'SET_FOUNDED_TWEETS',
    'SET_LOADER_TRUE', 'SET_LOADER_FALSE'],
  },
  {
    prefix: "explore",
  }
);

export const ACTIONS = {
  ...actions.actions,
}
