import React from "react";
import {styled} from "@mui/material/styles";
import NavigationHeader from "./NavigationHeader";
import SearchBox from "./SearchBox";

const SectionNavigation = () => {
  const SectionWrapper = styled('section')(styles);

  return (
    <SectionWrapper>
      <NavigationHeader/>
      <SearchBox/>
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
