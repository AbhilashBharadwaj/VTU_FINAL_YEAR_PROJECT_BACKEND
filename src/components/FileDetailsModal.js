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

class FileDetailsModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    keysRender: [],
    // index: null,
  };
  //   componentDidUpdate
  componentDidUpdate() {
    this.getKeys();
  }

  getKeys = () => {
    const keyList = [];
    axios.get("https://localhost:1234/api/access/getAllKeys").then((res) => {
      for (let i = 0; i < res.data.details.length; i++) {
        for (let j = 0; j < res.data.details[i].length; j++) {
          //   console.log(JSON.parse(sessionStorage.getItem(this.props.index)).id);
          if (
            JSON.parse(sessionStorage.getItem(this.props.index)).id ==
            res.data.details[i][j].document_id
          ) {
            keyList.push(
              <tr>
                <td>{res.data.details[i][j].key}</td>
              </tr>
            );
          }
        }
      }
      this.setState({
        keysRender: keyList,
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        {sessionStorage.length != 0 ? (
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Document details
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Card style={{ width: "26rem" }}>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>Document ID</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .id
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .filename
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Author</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .author
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Company</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .company
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Street</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .street
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .city
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .state
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Zipcode</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .zip
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Created at</td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem(this.props.index))
                            .createdAt
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      View Keys
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Table striped bordered hover>
                        <tbody>{this.state.keysRender}</tbody>
                      </Table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

export default FileDetailsModal;
