import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import store from "./store";

function App() {
  return (
    <Router>
      <Route exact path={"/"} component={Login} />
      <PrivateRoute exact path={"/home"} component={Home} />
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().token ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default App;
