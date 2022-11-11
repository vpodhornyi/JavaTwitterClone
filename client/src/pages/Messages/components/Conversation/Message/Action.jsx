import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";

const Action = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper className='Actions'>
      <Box>
        <CustomIconButton name='FavoriteBorderOutlined' title='React' size='small' iconSize='small'/>
      </Box>
      <Box>
        <CustomIconButton name='MoreHorizOutlined' title='More' size='small' iconSize='small'/>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  display: 'flex',
  opacity: 0,

});

export default Action;
