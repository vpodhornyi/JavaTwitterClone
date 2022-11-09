import React from "react";
import PrimaryColumn from "@components/PrimaryColumn";
import SidebarColumn from "@components/SidebarColumn";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <PrimaryColumn element={Box}/>
      <SidebarColumn/>
    </Box>
  );
}

export default Home;
