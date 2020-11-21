import React, { Component } from "react";
import { Browser, Router, Route } from "react-router-dom";
import { Container, Form, Button, Navbar, Row, Card } from "react-bootstrap";
import Camera from "../assets/camera.jpg";
import styled from "styled-components";
import NavBar from "./NavBar";
import Layout from "./Layout";

import axios from "axios";

import { Link } from "react-router-dom";

const Styles = styled.div`
  .home {
    background: url(${Camera}) no-repeat fixed bottom;
    background-size: cover;
    position: relative;
    padding-top: 65px;
  }
`;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("https://localhost:1234/api/login", user)
      .then((res) => {
        console.log(res);
        if (res && res.data.message == "success") {
          localStorage.setItem("auth-token", res.headers["auth-token"]);
          localStorage.setItem(
            "user-name",
            this.state.email.split("@")[0].charAt(0).toUpperCase() +
              this.state.email.split("@")[0].substring(1)
          );

          console.log("Success");
          this.props.history.push("/Library");
        } else {
          alert(res.data.details);
        }
        // console.log(res.data);
        // console.log(res.headers["auth-token"]);
      })
      .catch((err) => {
        if (err.response.status == 400) {
          alert(err.response.data.details);
        }
        console.log(err);
      });
  };

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
              style={{ width: "26rem", height: "26rem" }}
            >
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={this.state.email}
                      required="true"
                      placeholder="Enter email"
                      onChange={this.handleEmailChange}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={this.state.password}
                      required="true"
                      placeholder="Password"
                      onChange={this.handlePasswordChange}
                    />
                  </Form.Group>
                  <br />
                  <br />
                  <br />
                  <Button variant="outline-dark" type="submit">
                    Submit
                  </Button>

                  <Link to="/Register">
                    <Button variant="outline-dark">Register</Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;
