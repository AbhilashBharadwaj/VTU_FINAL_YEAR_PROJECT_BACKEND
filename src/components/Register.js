import React, { Component } from "react";
import { Container, Form, Button, Navbar, Row, Card } from "react-bootstrap";
import Camera from "../assets/camera.jpg";
import styled from "styled-components";
import NavBar from "./NavBar";
import Layout from "./Layout";
import Carousel from "react-bootstrap/Carousel";

const Styles = styled.div`
  .home {
    background: url(${Camera}) no-repeat fixed bottom;
    background-size: cover;
    position: relative;
    padding-top: 65px;
  }
`;
class Register extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Container>
          <Row>
            <Card
              className="shadow p-3 mb-5 bg-white rounded"
              style={{ width: "26rem", height: "30rem" }}
            >
              <Card.Header>Register</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      required="true"
                      placeholder="Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required="true"
                      placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required="true"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <br />
                  <Button variant="outline-dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Register;
