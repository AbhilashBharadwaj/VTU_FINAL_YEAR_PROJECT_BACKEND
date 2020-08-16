import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import NoMatch from "./components/NoMatch";
import Layout from "./components/Layout";
import Library from "./components/Library";
import UploadModal from "./components/UploadModal";
import OwnedDocs from "./components/OwnedDocs";

import Home from "./components/Home";

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/library" component={Library} />
            {/* <Route exact path="/authorHome" component={UploadModal} /> */}
            <Route exact path="/documents" component={OwnedDocs} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
