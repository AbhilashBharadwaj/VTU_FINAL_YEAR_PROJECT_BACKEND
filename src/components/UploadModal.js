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

class UploadModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    company: "Hello",
    city: "",
    street: "",
    _state: "Andhra Pradesh",
    zip: "",
    file: null,
    cover: null,
    keys: "",
    author: "",
  };
  // handleChange = (event) => {
  //   const name = event.target.id;
  //   const value = event.target.value;
  //   console.log(value);
  //   this.setState({
  //     formControls: {
  //       [name]: value,
  //     },
  //   });
  // };
  handleAuthorChange = (e) => {
    this.setState({
      author: e.target.value,
    });
  };
  handleCompanyChange = (e) => {
    this.setState({
      company: e.target.value,
    });
  };
  handleStreetChange = (e) => {
    this.setState({
      street: e.target.value,
    });
  };
  handleZipChange = (e) => {
    this.setState({
      zip: e.target.value,
    });
  };

  handleCityChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  handleKeysChange = (e) => {
    this.setState({
      keys: e.target.value,
    });
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
    console.log(this.state.file);
  };
  handleCoverChange = (event) => {
    this.setState({ cover: event.target.files[0] });
    console.log(this.state.cover);
  };
  handleStateChange = (e) => {
    console.log("INside state change");
    this.setState({
      _state: e.target.value,
    });
    console.log(e.target.value);
  };
  handleSubmit = (event) => {
    console.log("Inside submit");
    event.preventDefault();
    const formData = new FormData();
    console.log(this.state.company);

    formData.append("file_name", this.state.file.name);
    formData.set("company", this.state.company);
    formData.append("city", this.state.city);
    formData.append("street", this.state.street);
    formData.append("state", this.state._state);
    formData.append("zip", this.state.zip);
    formData.append("keys", this.state.keys);
    formData.append("author", this.state.author);

    formData.append("document", this.state.file, this.state.file.name);
    formData.append("cover", this.state.cover, this.state.cover.name);
    // console.log(formData);
    for (let [name, value] of formData) {
      console.log(name, value);
    }
    axios.defaults.headers.common["validation"] =
      "$2b$10$uabCDajaYTvhXp.3N7Hw7utE9G4KvOrLzD04c51wJajs/hpDmViT6";

    axios.defaults.headers.common["auth-token"] = localStorage.getItem(
      "auth-token"
    );

    const myurl = "https://localhost:1234/api/access/newDocument";
    axios({
      method: "post",
      url: myurl,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        if (response.data.message == "success") {
          window.location.reload("false");
        } else alert("Invalid input");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    // const fileDetails = {
    //   company: this.state.company,
    //   city: this.state.city,
    //   street: this.state.street,
    //   state: this.state.state,
    //   zip: this.state.zip,
    //   file: this.state.file,
    //   cover: this.state.cover,
    //   keys: this.state.keys,
    // };
  };
  render() {
    return (
      <React.Fragment>
        {/* <NavBarLogin></NavBarLogin>
        <br />
        <br />
        <br /> */}
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Upload Documents
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridStreet">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="God gamer"
                    onChange={this.handleAuthorChange}
                    name="author"
                  />
                </Form.Group>
                <Form.Group controlId="formGridCompany">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ligma"
                    name="company"
                    onChange={this.handleCompanyChange}
                    id="company"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    placeholder="Bangalore"
                    onChange={this.handleCityChange}
                    name="city"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Richmond Street"
                    onChange={this.handleStreetChange}
                    name="street"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    htmlSize={4}
                    onChange={this.handleStateChange}
                    name="_state"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh (AP)</option>
                    <option value="Arunachal Pradesh">
                      Arunachal Pradesh (AR)
                    </option>
                    <option value="Assam">Assam (AS)</option>
                    <option value="Bihar">Bihar (BR)</option>
                    <option value="Chhattisgarh">Chhattisgarh (CG) </option>
                    <option value="Goa">Goa (GA)</option>
                    <option value="Gujarat"> Gujarat (GJ) </option>
                    <option value="Haryana">Haryana (HR)</option>
                    <option value="Himachal Pradesh">
                      Himachal Pradesh (HP)
                    </option>
                    <option value="Jammu and Kashmir ">
                      {" "}
                      Jammu and Kashmir (JK)
                    </option>
                    <option value="Jharkhand"> Jharkhand (JH)</option>
                    <option value="Karnataka"> Karnataka (KA)</option>
                    <option value="Kerala"> Kerala (KL)</option>
                    <option value="Madhya Pradesh"> Madhya Pradesh (MP)</option>
                    <option value="Maharashtra"> Maharashtra (MH)</option>
                    <option value="Manipur">Manipur (MN)</option>
                    <option value="Meghalaya">Meghalaya (ML)</option>
                    <option value="Mizoram">Mizoram (MZ)</option>
                    <option value="Nagaland">Nagaland (NL)</option>
                    <option value="Odisha">Odisha(OR)</option>
                    <option value="Punjab"> Punjab (PB)</option>
                    <option value="Rajasthan"> Rajasthan (RJ)</option>
                    <option value="Telangana">Telangana (TS)</option>
                    <option value="Rajasthan">Tamil Nadu (TN)</option>
                    <option value="Sikkim">Sikkim (SK)</option>
                    <option value="Tripura">Tripura (TR) </option>
                    <option value="Uttar Pradesh">Uttar Pradesh (UP)</option>
                    <option value="Uttarakhand">Uttarakhand (UK)</option>
                    <option value="West Bengal"> West Bengal (WB)</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="560001"
                    onChange={this.handleZipChange}
                    name="zip"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFile">
                  <Form.Label>File</Form.Label>
                  <Form.File
                    required
                    id="file"
                    label=""
                    custom
                    name="file"
                    onChange={this.handleFileChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCoverPic">
                  <Form.Label>Cover Picture</Form.Label>
                  <Form.File
                    required
                    id="cover"
                    label=""
                    custom
                    name="cover"
                    onChange={this.handleCoverChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Number of keys</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="1"
                    onChange={this.handleKeysChange}
                    name="keys"
                  />
                </Form.Group>
              </Form.Row>
              <br />

              <Button
                style={{ margin: "5px" }}
                variant="outline-dark"
                type="submit"
              >
                Upload and generate keys
              </Button>
              <Button onClick={this.props.onHide}>Close</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UploadModal;
