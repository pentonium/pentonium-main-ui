import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { routes } from "./routes";
import { RouteWithSubRoutes } from "./helpers";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.scss';
import { connect } from "react-redux";
import { connectIfAuthorized } from "./actions/commonAction";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Spinner } from "react-bootstrap";

class App extends Component {

  async componentDidMount() {
    await this.props.connectIfAuthorized();
  }

  render() {
    return (
      <div className="App">
        {this.props.web3 ?
        <>
        {window.location.pathname != "/" &&
          <Header />
        }
          <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
          </Switch>
         <Footer />
         </>
         : <div className="text-center">
           oooo
           <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
           </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
const { web3,  loading, error } = state.common;
  return {
    web3,
    loading,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectIfAuthorized: () => dispatch(connectIfAuthorized()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
