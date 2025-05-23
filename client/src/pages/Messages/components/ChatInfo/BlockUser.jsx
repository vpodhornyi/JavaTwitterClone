import React, {useContext} from "react";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import Action from "./Action";
import BlockConfirm from "../confirms/BlockConfirm";
import {Context} from "@utils/context";

const BlockUser = ({userTag}) => {
  const {toggleModal} = useContext(Context);

  return (
    <Box onClick={() => toggleModal(<BlockConfirm toggleModal={toggleModal}/>, true)}>
      <Action name={`Block @${userTag}`}/>
    </Box>);
}

BlockUser.propTypes = {
  userTag: PropTypes.string,
}
export default BlockUser;
