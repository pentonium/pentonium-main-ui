import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import NewCollection from "../NewCollection";
import { getAllCategoryJobs } from "../../actions/jobListActions";
import { connectIfAuthorized } from "../../actions/commonAction";
import { home_contract_addresses } from "../../config";
import Header from "../header/Header";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = async () => {
    await this.props.connectIfAuthorized();
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
          <Row className="collections-list">
            {this.props.fulllist &&
              this.props.fulllist.map((job, i) => {
                return (
                  <NewCollection
                    key={i}
                    categoryName={job.name}
                    list={job.list}
                    categoryContract={job.offerContract}
                    loading={this.props.loading}
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
  const { web3, account, loading, error, contract } = state.common;
  const { fulllist } = state.jobList;
  const fulllistloading = state.jobList.loading;
  return {
    web3,
    account,
    loading,
    error,
    contract,
    fulllist,
    fulllistloading,
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
