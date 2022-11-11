import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

const Reaction = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <div>reaction</div>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end'
});

export default Reaction;
