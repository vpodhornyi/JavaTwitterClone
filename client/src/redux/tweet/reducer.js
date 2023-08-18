import {ACTIONS} from "./action";


const INITIAL_STATE = {
  loading: false,
  tweetByIdLoading: false,
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
  selectedTweet: {},
};

export default (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case String(ACTIONS.setPageNumber): {
      return {
        ...state,
        pageNumber: payload.pageNumber,
      }
    }
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
    case String(ACTIONS.getTweets.request): {
      return {
        ...state,
        loading: true,
      }
    }
    case String(ACTIONS.getTweets.success): {
      const tweets = payload.elements.filter(e => !state.tweets.find(t => e.id === t.id));
      return {
        ...state,
        loading: false,
        totalPages: payload.totalPages,
        tweets: [...state.tweets, ...tweets],
      }
    }
    case String(ACTIONS.getTweets.fail): {
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.deleteTweet.success):
      return {
        ...state,
        tweets: state.tweets.filter(el => el.id !== payload.id),
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
        tweets: [payload, ...state.tweets],
      };
    }
    case String(ACTIONS.retweet.success): {
      const tweet = state.tweets.find(t => t.id === payload.id);
      if (tweet) {
        tweet.isTweetRetweeted = payload.isTweetRetweeted;
        tweet.retweetsCount = payload.retweetsCount;
      }
      return {
        ...state,
      }
    }
    case String(ACTIONS.likeTweet.success): {
      const tweet = state.tweets.find(t => t.id === payload.id);
      if (tweet) {
        tweet.isTweetLiked = payload.isTweetLiked;
        tweet.likesCount = payload.likesCount;
      }
      return {
        ...state,
      }
    }
    case String(ACTIONS.updateLikesTweetCount): {
      const tweet = state.tweets.find(t => t.id === payload.id);
      if (tweet) {
        tweet.likesCount = payload.likesCount;
      }
      return {
        ...state,
      }
    }
    case String(ACTIONS.viewTweet.success): {
      const tweet = state.tweets.find(t => t.id === payload.id);
      if (tweet) {
        tweet.isTweetViewed = payload.isTweetViewed;
        tweet.viewsCount = payload.viewsCount;
      }
      return {
        ...state,
      }
    }
    case String(ACTIONS.bookmarkTweet.success): {
      const tweet = state.tweets.find(t => t.id === payload.id);
      if (tweet) {
        tweet.isTweetInBookmark = payload.isTweetInBookmark;
      }
      return {
        ...state,
      }
    }
    case String(ACTIONS.setSelectedTweet): {
      state.selectedTweet = payload;
      return {
        ...state,
      }
    }
    case String(ACTIONS.getTweetById.request): {
      state.tweetByIdLoading = true;
      return {
        ...state,
      };
    }
    case String(ACTIONS.getTweetById.success): {
      state.selectedTweet = payload;
      state.tweetByIdLoading = false;
      return {
        ...state,
      };
    }
    case String(ACTIONS.getTweetById.fail): {
      state.tweetByIdLoading = false;
      return {
        ...state,
      };
    }
    case String(ACTIONS.clearBookmarks.request): {
      return {
        ...state,
        loading: true,
      }
    }
    case String(ACTIONS.clearBookmarks.success): {
      return {
        ...state,
        tweets: [],
        loading: false,
      }
    }
    case String(ACTIONS.clearBookmarks.fail): {
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.deleteBookmark): {
      const tweets = state.tweets.filter(t => t.id !== payload.id);
      return {
        ...state,
        tweets,
      }
    }
    case String(ACTIONS.replyTweet.request): {
      return {
        ...state,
        loading: true,
      }
    }
    case String(ACTIONS.replyTweet.success): {
      const tweet = state.tweets.find(t => t.id === payload.id);
      if (!tweet) {
        state.replies = [payload, ...state.tweets];
      }
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.replyTweet.fail): {
      return {
        ...state,
        loading: false,
      }
    }
    case String(ACTIONS.resetGetTweets): {
      return {
        ...state,
        pageNumber: 0,
        pageSize: 7,
        tweets: [],
      }
    }
    default: {
      return state;
    }
  }
};
