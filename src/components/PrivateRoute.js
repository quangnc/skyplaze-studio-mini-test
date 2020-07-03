import React from "react";
import { Redirect } from "react-router-dom";
class PrivateRoute extends React.Component {
  render() {
    let self = this;
    if (!localStorage.getItem("logged")) {
      return <Redirect to={"/login"} />;
    } else {
      let Component = self.props.component;
      return <Component {...self.props} />;
    }
  }
}

export default PrivateRoute;
