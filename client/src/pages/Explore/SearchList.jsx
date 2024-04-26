import React from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const Index = ({ item }) => {
  const dispatch = useDispatch();

  return (
      <BoxWrapper>
        <p>I`m search list!</p>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',

}));

Index.propTypes = {
  item: PropTypes.object,
}
export default Index;
