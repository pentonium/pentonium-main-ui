import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { routes } from "./routes";
import { RouteWithSubRoutes } from "./helpers";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";

class App extends Component {
  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="container">
          <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
