import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Tab, Tabs} from "@mui/material";

import {Tweets} from "@components";
import {URLS} from "@services/API";

const TABS = [
  {
    tabName: 'Tweets',
    url: URLS.TWEETS.USER_TWEETS
  },
  {
    tabName: 'Replies',
    url: URLS.TWEETS.REPLIES_TWEETS
  },
  {
    tabName: 'Likes',
    url: URLS.TWEETS.LIKES_TWEETS
  }
];

const TwitterLists = () => {
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
            {TABS.map((el, i) => <Tab key={`Tab_${i}`} label={el.tabName} {...allProps(i)}/>)}
          </Tabs>
        </Box>
        {TABS.map((el, index) => {
          return (
              <Box
                  role="tabpanel"
                  hidden={value !== index}
                  id={`simple-tabpanel-${index}`}
                  key={`TabPanel_${index}`}
                  aria-labelledby={`simple-tab-${index}`}
              >
                {value === index && <Tweets url={el.url}/>}
              </Box>)
        })}
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .MuiButtonBase-root': {
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
    borderBottom: `1px solid ${theme.palette.border.main}`,

    '& .Mui-selected': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.main,
    },
  }
}));

export default TwitterLists;
