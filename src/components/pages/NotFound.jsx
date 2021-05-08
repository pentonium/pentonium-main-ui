import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";

class NotFound extends Component {
  state = {};
  render() {
    return (
      <div className="not-found text-center">
        <Helmet>
          <meta charSet="utf-8" />
          <title>404 Not Found</title>
        </Helmet>
        <Container className="body-padding">
          <h1>404</h1>
          <p>Oops! Something is wrong.</p>
          <button className="btn btn-secondary">
            <Link to="/">
              <i className="icon-home"></i> Go back in initial page, is better.
            </Link>
          </button>
        </Container>
      </div>
    );
  }
}

export default NotFound;
