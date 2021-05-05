import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Web3 from "web3";
import logo from "../../assets/BLACK-04.png";
import {
  fetchParentCategories,
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
  async componentWillMount() {
    // await this.props.connectWallet();
    // await this.props.connectIfAuthorized();
    // await this.props.getCategoriesList(this.props.contract, this.props.account);
  }

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

  // async checkLoggedIn() {
  //   if (window.web3 !== undefined) {
  //     if (window.ethereum) {
  //       const web3 = new Web3(window.ethereum);
  //       try {
  //         var loggedIn = await web3.eth.getAccounts();
  //         if (loggedIn.length > 0) {
  //           this.setState({ active: true });
  //         }
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }
  //   }
  // }

  // async connectWithMetaMask() {
  //   if (window.web3 !== undefined) {
  //     if (window.ethereum) {
  //       const web3 = new Web3(window.ethereum);
  //       try {
  //         await window.ethereum.enable();
  //         var accounts = await web3.eth.getAccounts();
  //         var firstAcc = accounts[0];
  //         this.setState({ active: true });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }
  //   }
  // }

  connectToMetaMask = async () => {
    await this.props.connectWallet();
    // await this.props.getCategoriesList(this.props.contract, this.props.account);
  };

  navigateToPost() {
    this.props.history.push("/post-job");
  }

  naviagteToUser = (type) => {
    this.props.history.push(`/order/${type}`);
  };

  render() {
    return (
      <>
        <header className={"header " + (!this.state.showSub && "transparent")}>
          <div className="header-core">
            <div className="container">
              <div className="nav-section">
                <ul className="nav-items">
                  <li key="inr" className="nav-item">
                    <button
                      className="btn btn-secondary post-btn"
                      onClick={this.navigateToPost.bind(this)}
                    >
                      Post
                    </button>
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
                            <Dropdown.Item
                              onClick={() => this.naviagteToUser("buyer")}
                            >
                              Buyer
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => this.naviagteToUser("seller")}
                            >
                              Seller
                            </Dropdown.Item>
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
                  {/* <span className="header-logo"></span> */}
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
                        <Link to={`/categories/${value.address}`}>
                          <span>{value.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="li-nav-item">
                    <Link aria-controls={"view-all"} to={"/category"}>
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
    fetchParentCategories: () => dispatch(fetchParentCategories()),
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
