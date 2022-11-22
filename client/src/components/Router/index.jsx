import React from "react";
import {Routes, Route} from "react-router-dom";
import routes from "../../routes";
import PrivateRoute from "./PrivateRoute";
import PropTypes from "prop-types";
import {getRoutes} from '../../routes';

const Router = ({authorized}) => {

  const foo = getRoutes(authorized)
  const voo = foo.map(route => (
    <Route key={route.path} path={route.path}
           element={<PrivateRoute route={route} authorized={authorized}/>}/>
  ))

  return (
    <Routes>
      {voo}
    </Routes>);
}

Router.propTypes = {
  authorized: PropTypes.bool,
}

export default Router;
