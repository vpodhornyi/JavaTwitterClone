import React, {Suspense, useMemo} from "react";
import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import {PageLoader, Preloader} from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import DialogWindow from "@components/DialogWindow";
import SnackBar from "@components/SnackBar";
import routes from "../routes";
import {createTheme, ThemeProvider} from "@mui/material/styles";


const AppContainer = () => {
  const loading = false;
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 500,
        sm: 715,
        md: 1018,
        lg: 1108,
        xl: 1295,
      },
    },
    palette: {
      mode: 'light',
      common: {
        black: '#1976d2',
        white: '#ffffff',
      },
      background: {
        paper: '#1976d2',
        default: '#ba68c8',
      },
      primary: {
        main: '#ffd400',
        secondary: '#00ba7c',
        contrastText: '#ffd400'
      },
      neutral: {
        main: '#ffd400',
      },
      orangeAccent: {
        main: '#ff7a00',
      },
      greenAccent: {
        main: '#00ba7c',
      },
      text: {
        primary: '#ba68c8'
      },
      action: {
        active: '#0f1419'
      }
    },
    typography: {
      fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontSize: '4rem',
      },
      h2: {
        fontSize: '2rem',
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
    },
  });

  const routeComponents = useMemo(() => routes.map(route => (
      <Route key={route.path} path={route.path} element={<PrivateRoute route={route}/>}/>
    )),
    []
  );

  const html = document.getElementsByTagName('html')[0];
  html.style.fontSize = '14px';

  return (
    <ThemeProvider theme={theme}>
      {/*<Preloader loaded={apiOk}/>*/}
      <DialogWindow/>
      <SnackBar/>
      <Suspense fallback={<PageLoader loaded={!loading}/>}>
        <Routes>{routeComponents}</Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default AppContainer;
