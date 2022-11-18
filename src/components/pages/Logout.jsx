import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContextAPI } from "./MainHeader";
const Logout = () => {
  const { state, dispatch } = useContext(UserContextAPI);
  const navigate = useNavigate();

  dispatch({ type: "USER", payload: false });
  localStorage.removeItem("userId");
  navigate("/login");

  return <></>;
};

export default Logout;
