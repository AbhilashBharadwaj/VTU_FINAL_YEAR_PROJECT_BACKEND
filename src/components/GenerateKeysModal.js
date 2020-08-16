import React, { Component } from "react";
import NavBarLogin from "./NavBarLogin";
import {
  Col,
  Container,
  Form,
  Button,
  Navbar,
  Row,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
class GenerateKeysModal extends Component {
  constructor(props) {
    super(props);
    this.state = { keys: "" };
  }

  handleKeyChange = (e) => {
    this.setState({
      keys: e.target.value,
    });
    console.log(e.target.value);
    console.log(this.state.keys);
  };
  generateKeys = (e) => {
    e.preventDefault();
    const doc = {
      document_id: JSON.parse(sessionStorage.getItem(this.props.index)).id,
      keys: this.state.keys,
    };
    axios.defaults.headers.common["validation"] =
      "$2b$10$uabCDajaYTvhXp.3N7Hw7utE9G4KvOrLzD04c51wJajs/hpDmViT6";

    axios.defaults.headers.common["auth-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjM2YThjZDIyNDgwZDA1MTgwMjNmNzEiLCJpYXQiOjE1OTc1MDY1OTN9.MN4SLQqXYWWAzeoeKn_XPOJknpQSdwkWbUa4gCIh34I";
    axios
      .post("https://localhost:1234/api/access/generateLicenseKeys", doc)
      .then((data) => {
        console.log(data);
      });
  };
  render() {
    return (
      <React.Fragment>
        <Modal
          {...this.props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Generate Keys
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.generateKeys}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Number of Keys</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="keys"
                  onChange={this.handleKeyChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Generate
              </Button>
            </Form>
            ;
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default GenerateKeysModal;
