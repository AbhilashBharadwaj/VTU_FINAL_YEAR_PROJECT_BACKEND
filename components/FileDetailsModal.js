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
    fileobject: JSON.parse(sessionStorage.getItem(this.props.index)),
    coverPic: "data:image/jpg;base64,",
    // index: null,
  };
  //   componentDidUpdate
  componentDidMount() {
    this.getKeys();
    this.getCoverPic();

    console.log(this.state.fileobject);
  }
  getCoverPic() {
    const coverURL = "https://localhost:1234/api/access/downloadImage";

    const documentID = { document_id: this.state.fileobject.id };
    axios.defaults.headers.common["validation"] =
      "$2b$10$uabCDajaYTvhXp.3N7Hw7utE9G4KvOrLzD04c51wJajs/hpDmViT6";

    axios.defaults.headers.common["auth-token"] = localStorage.getItem(
      "auth-token"
    );
    axios.post(coverURL, documentID).then((res) => {
      this.setState({ coverPic: this.state.coverPic + res.data });
      console.log(this.state.coverPic);
      console.log(res.data);
    });
  }
  getKeys = () => {
    const keyList = [];
    axios.get("https://localhost:1234/api/access/getAllKeys").then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.details.length; i++) {
        for (let j = 0; j < res.data.details[i].length; j++) {
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
              <Card style={{}}>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td>Document ID</td>
                      <td>{this.state.fileobject.id}</td>
                    </tr>
                    <tr>
                      <td>Cover picture</td>
                      <td>
                        <img
                          src={this.state.coverPic}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{this.state.fileobject.filename}</td>
                    </tr>
                    <tr>
                      <td>Author</td>
                      <td>{this.state.fileobject.author}</td>
                    </tr>
                    <tr>
                      <td>Company</td>
                      <td>{this.state.fileobject.company}</td>
                    </tr>
                    <tr>
                      <td>Street</td>
                      <td>{this.state.fileobject.street}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>{this.state.fileobject.city}</td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>{this.state.fileobject.state}</td>
                    </tr>
                    <tr>
                      <td>Zipcode</td>
                      <td>{this.state.fileobject.zip}</td>
                    </tr>
                    <tr>
                      <td>Created at</td>
                      <td>{this.state.fileobject.createdAt}</td>
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
