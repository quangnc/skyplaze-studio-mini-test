import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginComponent from "./pages/LoginComponent";
import RegisterComponent from "./pages/RegisterComponent";
import HomeComponent from "./pages/HomeComponent";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import "antd/dist/antd.css";
function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomeComponent} />
        <Route exact path="/login">
          <LoginComponent />
        </Route>
        <Route exact path="/register">
          <RegisterComponent />
        </Route>
        <Redirect from="/" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
