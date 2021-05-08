import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCustomerData } from "../../actions/commonAction";
import { withRouter } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { getUserGigs } from "../../actions/jobActions";
import JobCard from "../common/JobCard";
import { Helmet } from "react-helmet";
import Spinner from "react-bootstrap/Spinner";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gigData: [],
      loading: true,
    };
  }

  async componentDidMount() {
    if (this.props.web3) {
      await this.start();
    }
  }

  async componentDidUpdate(props, state) {
    if (this.props.web3 != props.web3) {
      await this.start();
    }
  }

  start = async () => {
    const customerId = this.props.match.params.customerId;

    let data = await getUserGigs(
      this.props.contract,
      customerId,
      this.props.web3
    );
    this.setState({ gigData: data, userAccount: customerId, loading: false });
    console.log("Gig", this.state.gigData);
  };

  render() {
    return (
      <div className="customer-list">
        <Helmet>
          <meta charSet="utf-8" />
          <title>User Job List</title>
        </Helmet>
        {!this.state.loading ? <Container style={{ paddingTop: "13rem" }}>
          <Row>
            <Col md={3} lg={3} sm={12} xs={12}>
              <Row className="top-profile-section">
                <Col md={12} sm={12} lg={12} xs={12}>
                  <div className="profile-section">
                    <div className="user-image">
                      <img
                        src="https://t3.ftcdn.net/jpg/01/83/55/76/360_F_183557656_DRcvOesmfDl5BIyhPKrcWANFKy2964i9.jpg"
                        alt="user-image"
                      />
                    </div>
                    <h5>{this.state.userAccount}</h5>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={9} md={9} sm={12} xs={12} className="collections-seller">
              <h1>User Gigs</h1>
              <Row className="collections">
                {this.state.gigData &&
                  this.state.gigData.length > 0 &&
                  this.state.gigData.map((job, i) => {
                    return (
                      job.ipfs_hash && <Col
                        key={i}
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        className="collections-seller-columns"
                      >
                        <JobCard
                          index={i}
                          hash={job}
                          offerContract={job.offerContract}
                          column="3"
                        ></JobCard>
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </Container>
        :
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.common);
  const { web3, accountConnection, account, contract } = state.common;
  return {
    web3,
    account,
    contract,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Customer));
