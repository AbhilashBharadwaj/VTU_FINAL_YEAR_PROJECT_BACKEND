import React, { Component } from "react";
import { Table, Tabs, Tab, Sonnet } from "react-bootstrap";

import NavBarLogin from "./NavBarLogin";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import UploadModal from "./UploadModal";
import axios from "axios";
import FileDetailsModal from "./FileDetailsModal";
import GenerateKeysModal from "./GenerateKeysModal";
import Badge from "react-bootstrap/Badge";
import RedeemDocumentsModal from "./RedeemDocuments";
import PdfViewer from "./PdfViewer";
class Library extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    uploadModalShow: false,
    fileDetailsModalShow: false,
    generateKeysModalShow: false,
    pdfViewerShow: false,
    redeemModal: false,
    index: 0,
    ownerFiles: [],
    userFiles: [],
    pdfBlob: "",
  };

  pdfData = (data) => {
    this.setState({
      pdfBlob: data,
    });
  };
  componentDidMount() {
    axios.defaults.headers.common["validation"] =
      "$2b$10$uabCDajaYTvhXp.3N7Hw7utE9G4KvOrLzD04c51wJajs/hpDmViT6";

    axios.defaults.headers.common["auth-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjM2YThjZDIyNDgwZDA1MTgwMjNmNzEiLCJpYXQiOjE1OTc1MDY1OTN9.MN4SLQqXYWWAzeoeKn_XPOJknpQSdwkWbUa4gCIh34I";
    axios
      .get("https://localhost:1234/api/access/getOwnedDocuments")
      .then((res) => {
        res.data["details"].forEach((element, index) => {
          sessionStorage.setItem(index, JSON.stringify(element));
        });

        console.log(res);
        this.setState({ ownerFiles: res.data["details"] });
        console.log(res.data["details"]);
      });

    axios
      .get("https://localhost:1234/api/access/getAllDocuments")
      .then((res) => {
        this.setState({ userFiles: res.data["details"] });
      });
  }
  render() {
    let uploadModalClose = () => this.setState({ uploadModalShow: false });
    let generateKeysModalClose = () =>
      this.setState({ generateKeysModalShow: false });
    let fileDetailsModalClose = () =>
      this.setState({ fileDetailsModalShow: false });
    let redeemModalClose = () => this.setState({ redeemModalShow: false });

    const { ownerFiles } = this.state;
    const { userFiles } = this.state;

    const renderOwnerTableData = (file, id) => {
      return (
        <tr>
          <td>{id}</td>
          <td>{file.filename}</td>
          <td>{file.author}</td>
          <td>{file.company}</td>
          <td>
            <a
              href="#"
              onClick={() =>
                this.setState({ index: id, fileDetailsModalShow: true })
              }
            >
              More
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={() => this.setState({ generateKeysModalShow: true })}
            >
              Keys
            </a>
          </td>
        </tr>
      );
    };
    const renderUserTableData = (file, id) => {
      return (
        <tr>
          <td>{id}</td>
          <td>{file.filename}</td>
          <td>{file.author}</td>
          <td>{file.company}</td>
          <td>
            <a
              href="#"
              onClick={() => this.setState({ index: id, pdfViewerShow: true })}
            >
              View
            </a>
          </td>
        </tr>
      );
    };
    return (
      <React.Fragment>
        <NavBarLogin></NavBarLogin>

        <br />
        <br />
        <br />
        <br />
        <br />
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Owner">
            {" "}
            <Button
              variant="secondary"
              onClick={() => this.setState({ uploadModalShow: true })}
            >
              Upload
            </Button>
            <UploadModal
              show={this.state.uploadModalShow}
              onHide={uploadModalClose}
            />
            <FileDetailsModal
              show={this.state.fileDetailsModalShow}
              onHide={fileDetailsModalClose}
              index={this.state.index ? this.state.index : 0}
            />
            <GenerateKeysModal
              show={this.state.generateKeysModalShow}
              onHide={generateKeysModalClose}
              index={this.state.index ? this.state.index : 0}
            />
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>{ownerFiles.map(renderOwnerTableData)}</tbody>
            </Table>
          </Tab>
          <Tab eventKey="profile" title="User">
            <Button
              variant="secondary"
              onClick={() => this.setState({ redeemModalShow: true })}
            >
              Redeem
            </Button>
            <PdfViewer
              show={this.state.pdfViewerShow}
              pdfBlob={this.state.pdfBlob}
            />
            <RedeemDocumentsModal
              show={this.state.redeemModalShow}
              logger={this.pdfData}
              onHide={redeemModalClose}
            />

            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>{userFiles.map(renderUserTableData)}</tbody>
            </Table>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default Library;
