import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { routes } from "./routes";
import { RouteWithSubRoutes } from "./helpers";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";
import './styles/global.scss';
import { Container } from "react-bootstrap";

class App extends Component {
  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Container className="body-padding">
          <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
          </Switch>
         </Container> 
      </div>
    );
  }
}

export default App;
