import React from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

import {Confirm} from '@components';
import {deleteTweet} from "@redux/tweet/action";

const DeleteTweetConfirm = ({toggleModal, tweetId}) => {
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(deleteTweet(tweetId))
    toggleModal();
  }

  return <Confirm
    title='Delete Tweet?'
    description='This can’t be undone and it will be removed from your profile,
     the timeline of any accounts that follow you, and from Twitter search results. '
    confirmName='Delete'
    confirmAction={confirm}
    toggleModal={toggleModal}
    confirmClassName='RedConfirmButton'
  />
}

DeleteTweetConfirm.propTypes = {
  toggleModal: PropTypes.func,
  tweetId: PropTypes.number,
}
export default DeleteTweetConfirm;
