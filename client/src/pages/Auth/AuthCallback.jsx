import React, {useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";

import {ModalPage, CircularLoader} from './../../components';

const Element = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const access = params.get("access");
    const refresh = params.get("refresh");
    console.log(access);
    console.log(refresh);

    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // navigate("/");
    } else {
      // navigate("/login");
    }
  }, []);

  return <div>Signing you in...</div>;
}

const GoogleCallback = () => <ModalPage closable={false} element={<Element/>}/>;

export default GoogleCallback;