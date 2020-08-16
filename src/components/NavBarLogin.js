import React from "react";
import { Nav, Navbar } from "react-bootstrap";

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
const userName = "Ram";
const AuthorNavBar = () => (
  <Styles>
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">DRM</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="./Home">Home</Nav.Link>
          <Nav.Link href="./Library">Library</Nav.Link>
        </Nav>
        <Navbar.Text>
          Signed in as: <a href="#login"> {userName}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default AuthorNavBar;
