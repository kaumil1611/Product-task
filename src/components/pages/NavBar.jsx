import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
import { UserContextAPI } from "./MainHeader";

const RenderNavLink = () => {
  const { state, dispatch } = useContext(UserContextAPI);
  const userID = localStorage.getItem("userId");

  useEffect(() => {
    if (userID) {
      dispatch({ type: "USER", payload: true });
    }
  }, [userID]);
  if (state) {
    return (
      <>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/product">
            Product
          </Nav.Link>
          <Nav.Link as={Link} to="/logout">
            Logout
          </Nav.Link>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/product">
            Product
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
        </Nav>
      </>
    );
  }
};
const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <RenderNavLink />
      </Container>
    </Navbar>
  );
};

export default NavBar;
