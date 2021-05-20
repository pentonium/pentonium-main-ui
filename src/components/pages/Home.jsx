import React, { Component } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllCategoryJobs } from "../../actions/jobListActions";
import { connectIfAuthorized, connectWallet } from "../../actions/commonAction";
import { home_contract_addresses } from "../../config";
import Header from "../common/Header";
import CardList from "../CardList";
import { Helmet } from "react-helmet";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.getAllCategories();
  }

  getAllCategories = async () => {
    await this.props.getAllCategoryJobs(
      this.props.account,
      this.props.web3,
      home_contract_addresses
    );
  };

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
        <Header onScroll={true} />
        <div className="poster">
          <Container>
            {/* <img src="/assets/img/banner.png" alt="" /> */}
            <Row className="align-center">
              <Col md={5}>
                <h1>
                  Welcome to the <b>Work-Sphere</b>
                </h1>
                <p>
                  Post your gig or get your Job done with 360 degree freedom in
                  your work-space with complete data security, ensured by fully
                  transparent Governance.
                </p>
              </Col>
              <Col md={7}>
                <img src="/assets/img/banner-1.svg" alt="" />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          {this.props.loading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
          <Row className="collections-list">
            {this.props.fulllist &&
              this.props.fulllist.map((job, i) => {
                return (
                  <CardList
                    key={i}
                    categoryName={job.name}
                    list={job.list}
                    categoryContract={job.offerContract}
                  ></CardList>
                );
              })}
          </Row>
        </Container>
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { web3, account, error, contract } = state.common;
  const { fulllist, loading } = state.jobList;

  return {
    web3,
    account,
    error,
    contract,
    fulllist,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectIfAuthorized: () => dispatch(connectIfAuthorized()),
    getAllCategoryJobs: (account, web3, offerContract) =>
      dispatch(getAllCategoryJobs(account, web3, offerContract)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
