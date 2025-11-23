import React from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

import {Confirm} from '@components';
import { followUser } from "@redux/user/action";

const UnfollowConfirm = ({ toggleModal, userId, userTag, user, action }) => {
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(followUser(userId))
    toggleModal();
    if (user) user.isFollowing = false;
    if (action) dispatch(action());
  }

  return <Confirm
      title={`Unfollow @${userTag}?`}
      description='Their posts will no longer show up in your For You timeline. You can still view their profile,
       unless their posts are protected.'
      confirmName='Unfollow'
      confirmAction={confirm}
      toggleModal={toggleModal}
      confirmClassName='RedConfirmButton'
  />
}

UnfollowConfirm.propTypes = {
  toggleModal: PropTypes.func,
  userId: PropTypes.number,
  userTag: PropTypes.string,
  user: PropTypes.object,
  action: PropTypes.func,
}
export default UnfollowConfirm;
