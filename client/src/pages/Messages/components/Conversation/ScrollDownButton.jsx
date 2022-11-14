import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import IconByName from "@components/icons/IconByName";

const ScrollDownButton = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <IconByName iconName='ArrowDownwardOutlined'/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  cursor: 'pointer',
  position: 'absolute',
  right: 50,
  bottom: 80,
  backgroundColor: '#ffffff',
  padding: '5px 15px',
  borderRadius: 24,
  boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 8px',

  '&:hover': {
    backgroundColor: 'rgb(230, 230, 230)',
  }
});

export default ScrollDownButton;