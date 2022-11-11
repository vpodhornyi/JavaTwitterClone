import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Box from "@mui/material/Box";
import UserRoute from "./UserRoute";
import {getMessageData} from "@redux/message/selector";
import Loading from "../Loading";

const SectionNavigation = () => {
  const BoxWrapper = styled(Box)(styles);
  const {isNavigationLoading, users, activeId} = useSelector(getMessageData);

  return (
    <BoxWrapper>
      <Header/>
      <SearchBox/>
      {isNavigationLoading ?
        <Box sx={{height: 'calc(100% - 2 * 117px)'}}>
          <Loading/>
        </Box> :
        <Box>{
          users.map(user => <UserRoute key={user.id} user={user} activeId={activeId}/>)
        }</Box>
      }
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  height: '100%',
  width: '100%',
});

export default SectionNavigation;
