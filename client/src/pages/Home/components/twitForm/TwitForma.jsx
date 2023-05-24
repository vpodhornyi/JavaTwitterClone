import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const TwitForma = ({item}) => {
  const dispatch = useDispatch();

  return (
      <BoxWrapper>
        Twit forma
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

}));

TwitForma.propTypes = {
  item: PropTypes.object,
}

export default TwitForma;
