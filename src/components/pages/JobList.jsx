import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/Category.scss";
import { fetchCategories } from "../../actions/categoryActions";
import { withRouter } from "react-router-dom";
import { getJobsList } from "../../actions/jobListActions";
import { connectIfAuthorized } from "../../actions/commonAction";
import { Row, Col, Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import JobCard from "../common/JobCard";
import { Helmet } from "react-helmet";

class Categories extends Component {
  constructor(props) {
    super(props);
  }

  getJobs = async (start, list) => {
    console.log(start);
    const categoryId = this.props.match.params.id;

    await this.props.getJobsList(
      this.props.contract,
      this.props.account,
      this.props.web3,
      categoryId,
      start,
      list
    );
  };

  async componentDidMount() {
    this.getJobs(null, []);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getJobs(null, []);
    }
  }

  render() {
    const last_item =
      this.props.list.length > 0
        ? this.props.list[this.props.list.length - 1]
        : {};

    const page_end = this.props.list.length > 0 ? last_item.id : 0;
    const nextId = this.props.list.length > 0 ? last_item.next : 0;

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>List of Jobs</title>
        </Helmet>
        <Container className="body-padding">
          {!this.props.loading && this.props.list ? (
            <div className="row">
              <div className="col-md-12 parent-cateogory-title text-center">
                <h1>{this.props.categoryNane}</h1>
              </div>
              <div className="row col-md-12 categories-section">
                <div className="col-md-12">
                  <Row className="collections">
                    {this.props.list &&
                      this.props.list.map((hash, i) => {
                        return (
                          hash.ipfs_hash != "" &&
                          hash.ipfs_hash != "abhbi" && (
                            <Col key={i} xs={12} sm={6} md={4} lg={3}>
                              <JobCard
                                index={i}
                                hash={hash}
                                offerContract={this.props.match.params.id}
                              ></JobCard>
                            </Col>
                          )
                        );
                      })}
                  </Row>

                  <div className="text-center">
                    {Number(this.props.end) > Number(page_end) && (
                      <div
                        className="btn btn-primary"
                        onClick={() => this.getJobs(nextId, this.props.list)}
                      >
                        Load More
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </Container>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { web3, account, contract } = state.common;
  const { list, start, end, loading, error, categoryNane } = state.jobList;
  return {
    categories: state.category.categoryItems,
    web3,
    account,
    loading,
    error,
    contract,
    list,
    start,
    end,
    categoryNane,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (id) => dispatch(fetchCategories(id)),
    connectIfAuthorized: () => dispatch(connectIfAuthorized()),
    getJobsList: (contract, account, web3, offerContract, start, jlist) =>
      dispatch(
        getJobsList(contract, account, web3, offerContract, start, jlist)
      ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
);
