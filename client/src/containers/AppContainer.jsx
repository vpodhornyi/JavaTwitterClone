import React, {Suspense, useMemo} from "react";
import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import {PageLoader, Preloader} from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import DialogWindow from "@components/DialogWindow";
import SnackBar from "@components/SnackBar";
import routes from "../routes";
import Box from "@mui/material/Box";

const AppContainer = () => {
  const loading = false;

  const routeComponents = useMemo(() => routes.map(route => (
      <Route key={route.path} path={route.path} element={
        <PrivateRoute route={route}/>
      }/>
    )),
    []
  );

  return (
    <>
      {/*<Preloader loaded={apiOk}/>*/}
      <DialogWindow/>
      <SnackBar/>
      <Suspense fallback={<PageLoader loaded={!loading}/>}>
        <Routes>{routeComponents}</Routes>
      </Suspense>
    </>
  )
}

export default AppContainer;
