import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/Category.scss";
import { fecthJobByCategory } from "../../actions/categoryActions";
import { Link, withRouter } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { CollectionCard } from "../../controllers/CollectionCard";
import { getJobsList } from "../../actions/jobListActions";
import { connectIfAuthorized } from "../../actions/commonAction";
import { getCategoriesList } from "../../actions/categoryListAction";
import { Container } from "react-bootstrap";
// import PaginationItem from 'react-bootstrap/PageItem'
// import PaginationLink from 'react-bootstrap/Pagination'

class Category extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.connectIfAuthorized();
    if (this.props.account) {
      await this.props.getCategoriesList(
        this.props.contract,
        this.props.account
      );
    }
  }

  render() {
    return (
      <Container className="body-padding">
        <div className="row">
          {this.props.categoryList && this.props.categoryList.length > 0 ? (
            <>
              <ul className="category-items">
                {this.props.categoryList.map((value, index) => {
                  return (
                    <li key={index}>
                      <Link to={"/categories/" + value.offer_contract}>
                        <span>{value.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div>No Items found</div>
          )}
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { web3, account, loading, error, contract } = state.common;
  const { categoryList } = state.categoryList;
  return {
    jobCategory: state.fetchJobs.categoryJob,
    web3,
    account,
    loading,
    error,
    contract,
    categoryList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fecthJobByCategory: (id) => dispatch(fecthJobByCategory(id)),
    connectIfAuthorized: () => dispatch(connectIfAuthorized()),
    getJobsList: (contract, account, web3, offerContract) =>
      dispatch(getJobsList(contract, account, web3, offerContract)),
    getCategoriesList: (contract, account) =>
      dispatch(getCategoriesList(contract, account)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
