import React from "react";
import {styled} from "@mui/material/styles";
import NavigationHeader from "./NavigationHeader";
import SearchBox from "./SearchBox";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import UserRoute from "./UserRoute";
import {getMessageData} from "@redux/message/selector";

const SectionNavigation = () => {
  const SectionWrapper = styled('section')(styles);
  const {users, activeId} = useSelector(getMessageData);

  return (
    <SectionWrapper>
      <NavigationHeader/>
      <SearchBox/>
      <Box>{
        users.map(user => <UserRoute key={user.id} user={user} activeId={activeId}/>)
      }</Box>
    </SectionWrapper>);
}

const styles = ({theme}) => ({
  height: '100%',
  width: '100%',
  borderLeft: '1px solid #DDDFE2',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('md')]: {
    width: 'auto',
  },
});

export default SectionNavigation;
