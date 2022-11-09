import React from "react";
import Box from "@mui/material/Box";
import SectionNavigation from "./components/SectionNavigation";
import SectionDetails from "./components/SectionDetails";

const Home = () => {
  return (
    <Box sx={{
      display: 'flex',
      height: '100%',
    }}>
      <SectionNavigation/>
      <SectionDetails/>
    </Box>);
}

export default Home;
