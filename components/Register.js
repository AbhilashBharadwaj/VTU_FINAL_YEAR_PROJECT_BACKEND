import React, { Component } from "react";
import { Container, Form, Button, Row, Card } from "react-bootstrap";
import Camera from "../assets/camera.jpg";
import styled from "styled-components";
import NavBar from "./NavBar";
import axios from "axios";

const Styles = styled.div`
  .home {
    background: url(${Camera}) no-repeat fixed bottom;
    background-size: cover;
    position: relative;
    padding-top: 65px;
  }
`;

class Register extends Component {
  state = { name: "", email: "", password: "" };
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios.defaults.headers.common["validation"] =
      "$2b$10$uabCDajaYTvhXp.3N7Hw7utE9G4KvOrLzD04c51wJajs/hpDmViT6";
    axios.post("https://localhost:1234/api/register", user).then((res) => {
      console.log(res.data);
      if (res.data.message == "success") {
        console.log(res.data.message);
        this.props.history.push("/Home");
      } else {
        alert(res.data.details);
      }
    });
  };
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
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      required="true"
                      placeholder="Name"
                      name="name"
                      onChange={this.handleNameChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required="true"
                      placeholder="Enter email"
                      name="email"
                      onChange={this.handleEmailChange}
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
                      name="password"
                      onChange={this.handlePasswordChange}
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
