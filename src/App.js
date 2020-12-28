import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { routes } from "./routes";
import { RouteWithSubRoutes } from "./helpers";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
      </div>
    );
  }
}

export default App;
