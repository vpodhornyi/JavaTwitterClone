import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {ROUTES} from "../../routes";


const PrivateRoute = ({route, authorized}) => {
  const {isPublic, page: Page} = route;

  if (isPublic) return <Page authorized={authorized}/>;

  return authorized ? <Page authorized={authorized}/> : <Navigate to={ROUTES.EXPLORE.PATH}/>;
};

PrivateRoute.propTypes = {
  route: PropTypes.object,
  authorized: PropTypes.bool,
}

export default PrivateRoute;
