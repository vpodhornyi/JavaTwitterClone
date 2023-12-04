import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";


  const Header = ({user}) => {
    const count = user.tweetsCount;
    return (
        <BoxWrapper>
          <Typography className='HeaderTitle' variant='h2'>{user.name}</Typography>
          <Typography className="" variant='body2'>{`
          ${count} Tweet${count === 1 ? '' : 's'}
          `}</Typography>
        </BoxWrapper>
    );
  }

  const BoxWrapper = styled(Box)(({theme}) => ({  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

Header.propTypes = {
  user: PropTypes.object,
}
export default Header;
