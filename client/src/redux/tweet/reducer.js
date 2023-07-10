import {ACTIONS, changeBookmark} from "./action";
import {addOrFilterItem} from "../../utils/tweets";

const INITIAL_STATE = {
  loading: false,
  form: {
    loading: false,
    MAX_IMAGES_COUNT: 3,
    images: [],
    text: '',
    canReply: 'PUBLIC',
  },
  pageNumber: 0,
  pageSize: 7,
  tweets: [],
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
};

export default (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setTweetFormImages): {
      state.form.images.push(payload);
      return {
        ...state,
      }
    }
    case String(ACTIONS.setTweetFormDeleteImage): {
      state.form.images.splice(payload, 1);
      return {
        ...state,
      }
    }
    case String(ACTIONS.setTweetFormImagesSrc): {
      state.form.images.at(-1).src = payload;
      state.form.images.at(-1).loading = false;
      return {
        ...state,
      }
    }
    case String(ACTIONS.setTweetFormCanReply): {
      state.form.canReply = payload;
      return {
        ...state,
      }
    }
    case String(ACTIONS.setTweetFormText): {
      state.form.text = payload;
      return {
        ...state,
      }
    }
    case String(ACTIONS.getTweets.request):
      return {
        ...state,
        loading: true,
      };
    case String(ACTIONS.deleteTweet.success):
      return {
        ...state,
        tweets: state.tweets.filter((el) => el.id !== payload),
      };
    case String(ACTIONS.createTweet.request): {
      state.form.loading = true;
      return {
        ...state,
      };
    }
    case String(ACTIONS.createTweet.success): {
      state.form = {
        ...state.form, ...{
          loading: false,
          images: [],
          text: '',
        }
      };
      return {
        ...state,
        tweets: [...state.tweets, payload],
      };
    }
    case String(ACTIONS.getTweets.success):
      return {
        ...state,
        tweets: payload.elements,
        loading: false,
      };
    case String(ACTIONS.getTweets.fail):
      return {
        ...state,
        loading: false,
      };
    case String(ACTIONS.handlerBookmark.success):
      localStorage.setItem("bookmarks", JSON.stringify(payload));
      return {
        ...state,
        bookmarks: payload,
      };
    case String(ACTIONS.changeBookmark):
      return {
        ...state,
        bookmarks: addOrFilterItem(state.bookmarks, payload, "bookmarks"),
      };
    case String(ACTIONS.changeActionsTweet.success):
      return {
        ...state,
        tweets: state.tweets.map((currentTweet) => {
          const {tweet, actionType, user} = payload;
          if (currentTweet.id === tweet.id) {
            const findActionIndex = currentTweet.actions.findIndex((action) => {
              return (
                action.actionType === actionType && action.user.id === user.id
              );
            });
            if (findActionIndex < 0) {
              currentTweet.actions.push({
                actionType: actionType,
                user: user,
              });
            } else {
              currentTweet.actions.splice(findActionIndex, 1);
            }
          }
          return currentTweet;
        }),
      };

    default: {
      return state;
    }
  }
};
