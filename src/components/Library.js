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
    userIndex: 0,

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

    axios.defaults.headers.common["auth-token"] = localStorage.getItem(
      "auth-token"
    );

    axios
      .get("https://localhost:1234/api/access/getOwnedDocuments")
      .then((res) => {
        res.data["details"].forEach((element, index) => {
          console.log(element);
          sessionStorage.setItem(index, JSON.stringify(element));
        });

        console.log(res);
        this.setState({ ownerFiles: res.data["details"] });
        console.log(res.data["details"]);
      });

    axios
      .get("https://localhost:1234/api/access/getAllDocuments")
      .then((res) => {
        res.data["details"].forEach((element, index) => {
          let id = "u" + String(index);
          sessionStorage.setItem(id, JSON.stringify(element));
        });
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
      let docUrl = "/viewPdf?id=";
      console.log("Index value outside", this.state.userIndex);
      if (this.state.userIndex != null) {
        docUrl += JSON.parse(
          sessionStorage.getItem("u" + String(this.state.userIndex))
        ).document_id;
      }

      return (
        <tr>
          <td>{id}</td>
          <td>{file.filename}</td>
          <td>{file.author}</td>
          <td>{file.company}</td>
          <td>
            <a
              target="_blank"
              href={docUrl}
              onClick={() =>
                this.setState({
                  userIndex: String(id),
                })
              }
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
        <Tabs defaultActiveKey="owner" id="uncontrolled-tab-example">
          <Tab eventKey="owner" title="Owner">
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
            {this.state.fileDetailsModalShow ? (
              <FileDetailsModal
                show={this.state.fileDetailsModalShow}
                onHide={fileDetailsModalClose}
                index={this.state.index ? this.state.index : 0}
              />
            ) : null}
            {this.state.generateKeysModalShow ? (
              <GenerateKeysModal
                show={this.state.generateKeysModalShow}
                onHide={generateKeysModalClose}
                index={this.state.index ? this.state.index : 0}
              />
            ) : null}
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
