import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Home from "./Home";
import Register from "./Register";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand,
  .navbar-nav,
  .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

const NavBar = () => (
  <Styles>
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">DRM</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="./Home">Home</Nav.Link>
          <Nav.Link href="./Login">Login</Nav.Link>
          <Nav.Link href="./Register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default NavBar;
