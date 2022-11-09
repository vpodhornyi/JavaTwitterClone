import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import BodyContainer from "../../containers/BodyContainer";

const PrivateRoute = ({route}) => {
  const {authorized} = useSelector(state => state.auth);
  const {isPublic, isLogin, element: Element} = route;

  if (authorized && isLogin) return <Navigate to="/home"/>;

  if (isPublic) return <Element/>;

  return authorized ? <BodyContainer page={Element}/> : <Navigate to="/"/>;
};

PrivateRoute.propTypes = {
  route: PropTypes.object,
  isPublic: PropTypes.bool,
  element: PropTypes.element
}

export default PrivateRoute;
