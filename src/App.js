import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { routes } from "./routes";
import { RouteWithSubRoutes } from "./helpers";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from "./components/header/Header";
import Footer from './components/footer/Footer';
import './styles/index.scss';
import { Container } from "react-bootstrap";
import BreadCrumb from "./controllers/SiteBreadCrumb";

class App extends Component {
  state = {
  };

  componentDidMount() {
    // alert(window.location.pathname);
  }

  render() {
    return (
      <div className="App">
        {window.location.pathname != "/" &&
          <Header></Header>
        }
        {/* <Container className="body-padding"> */}
        {/* <BreadCrumb></BreadCrumb> */}
          <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
          </Switch>
         {/* </Container>  */}
         <Footer></Footer>
      </div>
    );
  }
}

export default App;
