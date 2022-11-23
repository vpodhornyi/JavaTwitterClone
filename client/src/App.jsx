import React, {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useSelector} from 'react-redux';

import {PageLoader, Preloader} from "@components/Loader";
import {
  Header, Main, Router, AppBar, SnackBar, DialogWindow, MainContainer, RootContainer
} from "./components";
import {themeStyles} from "./utils/theme";

const AppContainer = () => {
  const {authorized, loading, routes, menu} = useSelector(state => state.auth);
  const theme = createTheme(themeStyles);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RootContainer>
          <Suspense fallback={<PageLoader loaded={!loading}/>}>
            <Header>
              <AppBar menu={menu} authorized={authorized}/>
            </Header>
            <Main>
              <MainContainer>
                <Router authorized={authorized} routes={routes}/>
              </MainContainer>
            </Main>
          </Suspense>
        </RootContainer>
        <DialogWindow/>
        <SnackBar/>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default AppContainer;
