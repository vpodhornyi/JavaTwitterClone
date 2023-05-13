import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {IconByName} from "../../../../components";
import {moment} from "@utils";

const DateInfo = ({icoName, title, date}) => {

  return (
      <BoxWrapper sx={{mr: 2}}>
        <IconByName iconName={icoName}/>
        <Typography variant="subtitle1" sx={{ml: 1}}>{title}</Typography>
        <Typography variant="subtitle1" sx={{ml: 1}} className="Date">{moment(date).format('MMMM DD[,] YYYY')}</Typography>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  color: 'inherit',

  '& .IconByName': {
    color: theme.typography.subtitle1.color,
  }
}));

DateInfo.propTypes = {
  icoName: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
}
export default DateInfo;
