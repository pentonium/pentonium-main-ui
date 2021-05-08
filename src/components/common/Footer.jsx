import React, { Component } from "react";
import { connect } from "react-redux";
import Web3 from "web3";
import { Row, Col, Badge } from "react-bootstrap";
import { Container } from "react-bootstrap";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.fetchParentCategories();
  }

  async connectWithMetaMask() {
    if (window.web3 !== undefined) {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          var accounts = await web3.eth.getAccounts();
          var firstAcc = accounts[0];
          this.setState({ active: true });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  onClick() {
    this.connectWithMetaMask();
  }

  render() {
    return (
      <>
        <Col md={12} sm={12} className="footer-outer">
          <Container className="footer-top-section">
            <Row className="Footer">
              <Col md={3} sm={12}>
                <h6>Categories</h6>
                {/* <ul>
                                {this.props.parentCategories.map((value, index) => {
                                    return <li key={index}><a href={'/list/'+value.id}>{value.name}</a></li>
                                })}
                                </ul> */}
              </Col>
              <Col md={3} sm={12}>
                <h6>About</h6>
                <ul>
                  <li>
                    <a href="/">Careers</a>
                  </li>
                  <li>
                    <a href="/">Press & News</a>
                  </li>
                  <li>
                    <a href="/">Paternship</a>
                  </li>
                  <li>
                    <a href="/">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/">Terms of Service</a>
                  </li>
                  <li>
                    <a href="/">Investor Relationship</a>
                  </li>
                </ul>
              </Col>
              <Col md={3} sm={12}>
                <h6>Support</h6>
                <ul>
                  <li>
                    <a href="/">Help & Support</a>
                  </li>
                  <li>
                    <a href="/">Trust & Safety</a>
                  </li>
                  <li>
                    <a href="/">Selling</a>
                  </li>
                  <li>
                    <a href="/">Buying</a>
                  </li>
                </ul>
              </Col>
              <Col md={3} sm={12}>
                <h6>Community</h6>
                <ul>
                  <li>
                    <a href="/">Events</a>
                  </li>
                  <li>
                    <a href="/">Blog</a>
                  </li>
                  <li>
                    <a href="/">Become a Seller</a>
                  </li>
                  <li>
                    <a href="/">Podcast</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <hr />
              <div className="footer-bottom-section">
                <div className="logo-section">
                  <a href="/">
                    <span className="header-logo"></span>
                  </a>
                </div>
              </div>
            </Row>
          </Container>
        </Col>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    parentCategories: state.common.parentCategories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
