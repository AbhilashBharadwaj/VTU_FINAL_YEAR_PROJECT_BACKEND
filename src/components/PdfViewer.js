import React, { Component } from "react";

import PDFViewer from "pdf-viewer-reactjs";

class PdfViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.show ? (
      <div style={{ overflow: "scroll", height: 600 }}>
        <h1>Hello {console.log(this.props.pdfBlob)}</h1>
        <PDFViewer
          document={{
            base64: this.props.pdfBlob,
          }}
        />
      </div>
    ) : null;
  }
}

export default PdfViewer;
