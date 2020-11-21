import React, { Component } from "react";
import axios from "axios";
import PDFViewer from "pdf-viewer-reactjs";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";

class ViewPdf extends Component {
  constructor(props) {
    super(props);
    this.state = { pdfBlob: "" };
  }
  componentDidMount() {
    const postURL = "https://localhost:1234/api/access/download";
    const docID = { document_id: this.props.location.search.split("=")[1] };
    axios.defaults.headers.common["validation"] =
      "$2b$10$uabCDajaYTvhXp.3N7Hw7utE9G4KvOrLzD04c51wJajs/hpDmViT6";
    axios.defaults.headers.common["auth-token"] = localStorage.getItem(
      "auth-token"
    );

    axios.post(postURL, docID).then((res) => {
      this.setState({
        pdfBlob: res.data,
      });
    });
  }
  render() {
    return (
      <div style={{}}>
        {this.state.pdfBlob !== "" ? (
          <PDFViewer
            watermark={{
              text: "DRM",
              color: "#000000",
              diagonal: "true",
            }}
            document={{
              base64: this.state.pdfBlob,
            }}
            protectContent
            watermark={{
              text: "DRM Demo",
              diagonal: true,
              opacity: "0.4",
              size: "125",
              color: "#768089",
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default ViewPdf;
