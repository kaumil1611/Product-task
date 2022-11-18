import { createContext, useReducer } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { initialState, reducer } from "../Reducer";

export const UserContextAPI = createContext();
const MainHeader = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContextAPI.Provider value={{ state, dispatch }}>
        <NavBar />
        <Outlet />
      </UserContextAPI.Provider>
    </>
  );
};

export default MainHeader;
