import React, { Component } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import NewCollection from "../NewCollection";
import { getAllCategoryJobs } from "../../actions/jobListActions";
import { connectIfAuthorized, connectWallet } from "../../actions/commonAction";
import { home_contract_addresses } from "../../config";
import Header from "../header/Header";

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
        <Header onScroll={true} />
        <div className="poster">
          <Container>
            {/* <img src="/assets/img/banner.png" alt="" /> */}
            <Row className="align-center">
              <Col md={5}>
                <h1>Work From Home</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate sequi sed minus a aspernatur, quo quidem architecto
                  consequatur iusto suscipit quae hic sit, repudiandae nihil
                  atque cumque mollitia at similique!
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
                  <NewCollection
                    key={i}
                    categoryName={job.name}
                    list={job.list}
                    categoryContract={job.offerContract}
                  ></NewCollection>
                );
              })}
          </Row>
        </Container>
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
