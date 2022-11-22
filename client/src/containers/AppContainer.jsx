import React, {Suspense} from "react";
import {PageLoader, Preloader} from "@components/Loader";
import {useSelector} from "react-redux";
import DialogWindow from "@components/DialogWindow";
import SnackBar from "@components/SnackBar";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import AppBar from "../components/AppBar";
import Router from "../components/Router";
import {themeStyles} from "../utils/theme";
import {getAuthorized} from '@redux/auth/selector';


const AppContainer = () => {
  const loading = false;
  const authorized = useSelector(getAuthorized);
  const theme = createTheme(themeStyles);

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <AppBar authorized={authorized}/>
      </Header>
      <Main>
        <Container>
          <Suspense fallback={<PageLoader loaded={!loading}/>}>
            <Router authorized={authorized}/>
          </Suspense>
        </Container>
      </Main>
      <DialogWindow/>
      <SnackBar/>
    </ThemeProvider>
  )
}

const Header = styled('header')(({theme}) => ({
  display: 'none',

  [theme.breakpoints.up('xs')]: {
    flexGrow: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'end',
  },

  [theme.breakpoints.up('sm')]: {
    flexGrow: 1,
  },
}));

const Main = styled('main')(({theme}) => ({
  flexGrow: 1,
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    flexGrow: 2,
  },

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  }
}));

const Container = styled('div')(({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('sm')]: {
    width: 600,
  },

  [theme.breakpoints.up('md')]: {
    width: 920,
  },

  [theme.breakpoints.up('lg')]: {
    width: 990,
  }
}));

export default AppContainer;
