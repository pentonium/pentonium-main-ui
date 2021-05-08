import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Web3 from "web3";
import logo from "../../assets/BLACK-04.png";
import {
  connectWallet,
  connectIfAuthorized,
} from "../../actions/commonAction";
import {
  fetchCategories,
  createNewCategory,
} from "../../actions/categoryActions";
import Dropdown from "react-bootstrap/Dropdown";
import Collapse from "react-bootstrap/Collapse";
import { getJobsList } from "../../actions/jobListActions";
import { getCategoriesList } from "../../actions/categoryListAction";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { CATEGORY_LIST } from "../../config/categoryList";

class Header extends Component {
  state = {
    showSub: true,
  };

  componentDidMount() {
    if (this.props.onScroll) {
      this.setState({
        showSub: false,
      });
      window.addEventListener("scroll", this.showBar);
    }
  }

  showBar = () => {
    if (window.pageYOffset > 200 && !this.state.showSub) {
      this.setState({
        showSub: true,
      });
    } else if (window.pageYOffset < 200 && this.state.showSub) {
      this.setState({
        showSub: false,
      });
    }
  };

  connectToMetaMask = async () => {
    await this.props.connectWallet();
  };

  render() {
    return (
      <>
        <header className={"header " + (!this.state.showSub && "")}>
          <div className="header-core">
            <div className="container">
              <div className="nav-section">
                <ul className="nav-items">
                  <li key="inr" className="nav-item">
                    <Link to="/post-job" className="btn btn-secondary post-btn">
                      Post
                    </Link>
                  </li>
                  <li key="connect" className="nav-item">
                    {this.props.account ? (
                      <div className="logo-section">
                        <Dropdown className="logged-in-user-menus">
                          <Dropdown.Toggle menualign={"left"}>
                            <img
                              className="profile-dropdown"
                              src="https://innsida.ntnu.no/documents/10157/2548972475/user-profile-empty.png"
                              alt=""
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Link to="/order/buyer" className="dropdown-item">
                              Buyer
                            </Link>
                            <Link to="/order/seller" className="dropdown-item">
                              Seller
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary connect-btn"
                        onClick={this.connectToMetaMask}
                      >
                        Connect
                      </button>
                    )}
                  </li>
                </ul>
              </div>
              <div className="logo-section">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>
          </div>
          {this.state.showSub && CATEGORY_LIST ? (
            <div className="parent-nav-section">
              <div className="container">
                <ul className="nav-items nav-category-list">
                  {CATEGORY_LIST.map((value, index) => {
                    return (
                      <li key={index} className="li-nav-item">
                        <Link to={`/list/${value.address}`}>
                          <span>{value.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="li-nav-item">
                    <Link aria-controls={"view-all"} to={"/categories"}>
                      <span>View All</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </header>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { web3, account, loading, error, contract } = state.common;
  const { list } = state.jobList;
  const { categoryList } = state.categoryList;
  return {
    parentCategories: state.common.parentCategories,
    categories: state.category.categoryItems,
    web3,
    account,
    loading,
    error,
    contract,
    list,
    categoryList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (id) => dispatch(fetchCategories(id)),
    connectWallet: () => dispatch(connectWallet()),
    connectIfAuthorized: () => dispatch(connectIfAuthorized()),
    getJobsList: (contract, account, web3, offerContract) =>
      dispatch(getJobsList(contract, account, web3, offerContract)),
    getCategoriesList: (contract, account) =>
      dispatch(getCategoriesList(contract, account)),
    createNewCategory: (name, account, contract) =>
      dispatch(createNewCategory(name, account, contract)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
