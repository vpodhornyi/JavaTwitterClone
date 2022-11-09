import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";


const SectionNavigation = () => {
  const StyledBox = styled(Box)(styles);

  return (
    <StyledBox>
      <Typography variant='h2'>Messages</Typography>
      <CustomIconButton name='ForwardToInboxOutlined' title='New message'/>
    </StyledBox>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  width: '100%',
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [theme.breakpoints.up('md')]: {
    width: 360,
  },

  [theme.breakpoints.up('lg')]: {
    width: 390,
  },

  '& > .MuiTypography-root': {
    fontSize: '1.3rem',
    fontWeight: theme.typography.fontWeightBold
  }
});

export default SectionNavigation;
