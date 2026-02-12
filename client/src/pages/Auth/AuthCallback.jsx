import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import { ModalPage, CircularLoader } from './../../components';
import { setAuthToken, setTokenType, setHeaderAuthorization, setRefreshToken } from "@utils";
import { getAuthUser } from "../../redux/user/action";
import { ACTIONS } from "../../redux/auth/action";
import { PATH } from "../../utils/constants";

const Element = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const access = params.get("access");
      const refresh = params.get("refresh");
      const type = params.get("type");

      if (!access || !refresh) {
        navigate("/login", {replace: true});
        return;
      }
      setHeaderAuthorization(access, type);
      setAuthToken(access);
      setRefreshToken(refresh);
      setTokenType(type);
      dispatch(ACTIONS.authorize.success());

      try {
        await dispatch(getAuthUser());

        navigate(`${PATH.HOME}`, {replace: true});
      } catch (e) {
        console.error("getAuthUser failed:", e);
        navigate("/login?error=auth_failed", {replace: true});
      }
    };

    run();

  }, [params, navigate, dispatch]);

  return <div><CircularLoader/></div>;
}

const GoogleCallback = () => <ModalPage closable={false} element={<Element/>}/>;

export default GoogleCallback;