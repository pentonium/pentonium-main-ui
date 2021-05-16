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
    // if (window.web3 !== undefined) {
    //   if (window.ethereum) {
    //     const web3 = new Web3(window.ethereum);
    //     try {
    //       await window.ethereum.enable();
    //       var accounts = await web3.eth.getAccounts();
    //       var firstAcc = accounts[0];
    //       this.setState({ active: true });
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // }
  }

  onClick() {
    // this.connectWithMetaMask();
  }

  render() {
    return (
      <>
        <Col md={12} sm={12} className="footer-outer">
          <Container className="footer-top-section">
            <Row className="Footer">
              <Col md={3} sm={12} className="text-center">
                <img src="/assets/img/white.png" className="foot-img" alt="" />
                <h3>Pentonium</h3>
              </Col>
              <Col md={3} sm={12}>
                <h6>General</h6>
                <ul>
                  <li>
                    <a href="https://pentonium.com" target="_blank">
                      Home
                    </a>
                  </li>

                  <li>
                    <a href="https://pentonium.com/about.html" target="_blank">
                      About
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md={3} sm={12}>
                <h6>Support</h6>
                <ul>
                  <li>
                    <a
                      href="https://docs.pentonium.com/contact-us/customer-support"
                      target="_blank"
                    >
                      Help & Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.pentonium.com/general/marshal"
                      target="_blank"
                    >
                      Marshal
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.pentonium.com/general/service-provider"
                      target="_blank"
                    >
                      Service Provider
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.pentonium.com/general/client"
                      target="_blank"
                    >
                      Client
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md={3} sm={12}>
                <h6>Community</h6>
                <ul>
                  <li>
                    <a href="https://t.me/pentonium" target="_blank">
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a href="https://pentonium.medium.com/" target="_blank">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/pentonium" target="_blank">
                      Github
                    </a>
                  </li>
                </ul>
              </Col>
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
