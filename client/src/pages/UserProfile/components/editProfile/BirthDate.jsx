import React from "react";
import {styled} from "@mui/material/styles";
import {Box, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {moment} from "@utils";

const BirthDate = ({date, formData, editBirthDate, setEditBirthDate, onChangeDate}) => {
  return (
      <BoxWrapper>
        <Box sx={{display: "flex"}}>
          <Typography className="BirthTitle">Birth date</Typography>
          <Typography
              className="EditLink"
              onClick={() => setEditBirthDate(!editBirthDate)}
          >
            {editBirthDate ? "Cancel" : "Edit"}
          </Typography>
        </Box>
        {
          editBirthDate ?
              <TextField
                  value={formData.birthDate}
                  onChange={e => onChangeDate(e)}
                  label='Birthday'
                  id='birthDate'
                  type='date'
                  sx={{width: "100%", mt: 2}}
                  InputLabelProps={{
                    shrink: true
                  }}
              />
              :
              <Typography className="BirthDate">{moment(date).format('MMMM DD[,] YYYY')}</Typography>
        }
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',

  '& .BirthTitle': {
    color: theme.typography.subtitle1.color,

    '&:after': {
      content: '"·"',
      marginLeft: '5px',
      marginRight: '5px',
    }
  },

  '& .EditLink': {
    color: theme.palette.primary.main,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline'
    },
  },

  '& .BirthDate': {
    fontSize: '1.5rem',
  }
}));

BirthDate.propTypes = {
  date: PropTypes.string,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  editBirthDate: PropTypes.bool,
  setEditBirthDate: PropTypes.func,
  onChangeDate: PropTypes.func,
}
export default BirthDate;
