import React, {lazy, Suspense} from "react";
import {RouterProvider, createBrowserRouter, Outlet, useRoutes} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useSelector} from 'react-redux';
import Home from '@pages/Home';
import Explore from '@pages/Explore';
import Profile from '@pages/Profile';
import List from '@pages/List';

import {PageLoader, Preloader} from "@components/Loader";
import {
  Header, Main, Router, AppBar, SnackBar, DialogWindow, MainContainer, RootContainer
} from "./components";
import {themeStyles} from "./utils/theme";

const AppContainer = () => {
  const {authorized, loading, routes, menu} = useSelector(state => state.auth);
  const theme = createTheme(themeStyles);

  const element = useRoutes([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile/>,
      children: [
        {
          path: "list",
          element: <List/>,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Suspense fallback={<PageLoader loaded={!loading}/>}>
          <Header>
            <AppBar menu={menu} authorized={authorized}/>
          </Header>
          <Main>
            <MainContainer>
              {element}
              {/*<RouterProvider router={router}/>*/}
              {/*<Router authorized={authorized} routes={routes}/>*/}
            </MainContainer>
          </Main>
        </Suspense>
      </RootContainer>
      <DialogWindow/>
      <SnackBar/>
    </ThemeProvider>
  )
}

export default AppContainer;
