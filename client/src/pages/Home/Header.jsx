import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import {LogoIcon} from "../../components";

const Header = () => {

  return (
      <BoxWrapper>
        <Typography className='HeaderTitle' variant='h2'>Home</Typography>
        <Box className="LogoWrapper">
          <LogoIcon/>
        </Box>
      </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.up('xs')]: {
    justifyContent: 'start'
  },

  '& .HeaderTitle': {
    display: 'none',

    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },

  '& .LogoWrapper': {
    color: theme.palette.primary.main,
    paddingRight: '45px',

    '& .MuiSvgIcon-root': {
      fontSize: '1.75rem'
    },

    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
  }
}));

export default Header;
