import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
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
          <img src="/assets/img/banner.png" alt="" />
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
