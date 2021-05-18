import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/Category.scss";
import { Link, withRouter } from "react-router-dom";
import { getCategoriesList } from "../../actions/categoryListAction";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

class Category extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (this.props.contract) {
      await this.props.getCategoriesList(
        this.props.contract,
        this.props.account
      );
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Category Listing</title>
        </Helmet>
        <Container className="body-padding">
          <div className="row">
            {this.props.categoryList && this.props.categoryList.length > 0 ? (
              <>
                <ul className="category-items">
                  {this.props.categoryList.map((value, index) => {
                    return (
                      <li key={index}>
                        <Link to={"/list/" + value.offer_contract}>
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
      </>
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
    getCategoriesList: (contract, account) =>
      dispatch(getCategoriesList(contract, account)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
