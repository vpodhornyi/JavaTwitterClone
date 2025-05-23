import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";

import { URLS } from "@services/API";

const getTabs = (userId = 1) => [
  {
    tabName: 'Users',
    url: URLS.TWEETS.getUserTweets(userId),
  },
  {
    tabName: 'Tweets',
    url: URLS.TWEETS.getRepliesTweets(userId),
  }
];

const Index = ({ item }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function allProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
      <BoxWrapper>
        <Box className="TabsWrapper">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {getTabs().map((el, i) => <Tab key={`Tab_${i}`} label={el.tabName} {...allProps(i)}/>)}
          </Tabs>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',

  '& .MuiButtonBase-root': {
    width: '50%',
    textTransform: 'none',
    color: theme.typography.subtitle1.color,
    fontSize: theme.typography.body1.fontSize,

    '&:hover': {
      backgroundColor: theme.palette.background[3],
      transition: '0.1s'
    },

    '& .MuiTouchRipple-root': {
      display: 'none'
    }
  },

  '& .TabsWrapper': {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.border.main}`,

    '& .Mui-selected': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.main,
    },
  }
}));

Index.propTypes = {
  item: PropTypes.object,
}
export default Index;
