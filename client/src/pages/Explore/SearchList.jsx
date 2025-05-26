import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {URLS} from "@services/API";
import {PATH} from "@utils/constants";
import {CircularLoader} from "@components";
import FoundUser from "../Messages/components/UserSearch/FoundUser";

const getTabs = (userId = 1) => [
  {
    tabName: 'Top',
    url: URLS.TWEETS.getUserTweets(userId),
  },
  {
    tabName: 'Latest',
    url: URLS.TWEETS.getUserTweets(userId),
  },
  {
    tabName: 'People',
    url: URLS.TWEETS.getUserTweets(userId),
  },
  {
    tabName: 'Media',
    url: URLS.TWEETS.getRepliesTweets(userId),
  }
];

const Index = ({}) => {
  const [value, setValue] = React.useState(0);
  const {foundedUsers, loader} = useSelector(state => state.explore);

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
        <Box sx={{position: 'relative'}}>
          {loader ? <CircularLoader styles={{mt: 4}}/> :
            <Box>
              <Box
                role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-${0}`}
                key={`TabPanel_${0}`}
                aria-labelledby={`simple-tab-${0}`}
              >
                <Typography variant="h2" gutterBottom>In progress!!!</Typography>
              </Box>
              <Box
                role="tabpanel"
                hidden={value !== 1}
                id={`simple-tabpanel-${1}`}
                key={`TabPanel_${1}`}
                aria-labelledby={`simple-tab-${1}`}
              >
                <Typography variant="h2" gutterBottom>In progress!!!</Typography>
              </Box>
              <Box
                role="tabpanel"
                hidden={value !== 2}
                id={`simple-tabpanel-${2}`}
                key={`TabPanel_${2}`}
                aria-labelledby={`simple-tab-${2}`}
              >
                {
                  foundedUsers?.map(user => <Link
                    to={PATH.USER.profile(user?.userTag)}
                    key={user?.key}
                    onClick={e => e.stopPropagation()}>
                    <FoundUser key={user?.key} user={user}/>
                  </Link>)
                }
              </Box>
              <Box
                role="tabpanel"
                hidden={value !== 3}
                id={`simple-tabpanel-${3}`}
                key={`TabPanel_${3}`}
                aria-labelledby={`simple-tab-${3}`}
              >
                <Typography variant="h2" gutterBottom>In progress!!!</Typography>
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  textAlign: 'center',

  '& .MuiButtonBase-root': {
    width: '25%',
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
    // borderBottom: `1px solid ${theme.palette.border.main}`,

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
