import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import NoMatch from "./components/NoMatch";
import Layout from "./components/Layout";
import Library from "./components/Library";

import Home from "./components/Home";
import ViewPdf from "./components/ViewPdf";

function App() {
  return (
    <React.Fragment>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/library" component={Library} />
            {/* <Route exact path="/authorHome" component={UploadModal} /> */}

            <Route path="/viewPdf" component={ViewPdf} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </React.Fragment>
  );
}

export default App;
