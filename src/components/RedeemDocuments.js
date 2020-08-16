import React, { Component } from "react";
import PdfViewer from "./PdfViewer";
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
class RedeemDocumentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { key: "", document_id: "", pdfBlob: "" };
  }

  handleLicenseKeyChange = (e) => {
    this.setState({
      key: e.target.value,
    });
    console.log(e.target.value);
    console.log(this.state.keys);
  };
  redeem = (e) => {
    e.preventDefault();
    const licenseKey = {
      key: this.state.key,
    };
    axios.defaults.headers.common["validation"] =
      "$2b$10$uabCDajaYTvhXp.3N7Hw7utE9G4KvOrLzD04c51wJajs/hpDmViT6";

    axios.defaults.headers.common["auth-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjM2YThjZDIyNDgwZDA1MTgwMjNmNzEiLCJpYXQiOjE1OTc1MDY1OTN9.MN4SLQqXYWWAzeoeKn_XPOJknpQSdwkWbUa4gCIh34I";
    axios
      .post("https://localhost:1234/api/access/redeemLicenseKey", licenseKey)
      .then((res) => {
        this.setState({
          document_id: res.data.details,
        });
        axios
          .post("https://localhost:1234/api/access/download", {
            document_id: this.state.document_id,
          })
          .then((res) => {
            this.setState({
              pdfBlob: res.data,
            });
            this.props.logger(res.data);
            // console.log(res);
          });
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
              Redeem Document
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.redeem}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>License Key</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="key"
                  onChange={this.handleLicenseKeyChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Redeem
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RedeemDocumentsModal;
