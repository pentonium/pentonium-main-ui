import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActiveJobs } from "../../actions/categoryActions";
import { withRouter } from "react-router-dom";
import { Row, Col, Badge, Container } from "react-bootstrap";
import {
  getClientProviderList,
  getServiceProviderList,
} from "../../actions/jobListActions";
import { connectWallet } from "../../actions/commonAction";
import { BUYER, SELLER } from "../../constants";
import OrderItemList from "../../controllers/OrderItemList";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "currentJobs",
      currentTab: "orderlist",
    };
    this.changeTab = this.changeTab.bind(this);
  }

  async componentDidMount() {
    // await this.props.connectWallet();
    this.getOrderData();
  }

  componentDidUpdate(prevProps, prevState) {
    let prevUserType = this.getUserTpe(prevProps.match.url);
    let userType = this.getUserTpe(this.props.match.url);
    if (
      prevUserType !== userType ||
      prevProps.accountConnection != this.props.accountConnection
    ) {
      this.getOrderData();
    }
  }

  getUserTpe = (locationUrl) => {
    let param = locationUrl.split("/")[2]
    return param;
  }

  getOrderData = async () => {
    const userType = this.getUserTpe(this.props.match.url);
    console.log(this.props.accountConnection, this.props.account);
    if (userType == BUYER) {
      await this.props.getClientProviderList(
        this.props.accountConnection,
        this.props.account,
        this.props.contract
      );
    } else if (userType == SELLER) {
      await this.props.getServiceProviderList(
        this.props.accountConnection,
        this.props.account,
        this.props.contract
      );
    }
  };

  // getJobData(activeTab , flag){
  //     this.props.fetchActiveJobs('123' , flag);
  //     this.setState({activeTab:activeTab});
  // }

  changeTab(name) {
    this.setState({ currentTab: name });
  }

  render() {
    const type = this.getUserTpe(this.props.match.url);
    return (
      <div className="order-list-container">
        <Container>
          <Row>
            {/* <Col md={1}>    
                        <Button variant="primary" className={this.state.currentTab == 'buyer' ? 'active':''} onClick={() => this.changeTab('buyer')}>Buyer</Button>
                    </Col>
                    <Col md={1}>
                    <Button variant="primary" className={this.state.currentTab == 'seller' ? 'active':''} onClick={() => this.changeTab('seller')}>Seller</Button>
                    </Col> */}
            <Col className="dashboard-menus" md={12}>
              <nav className="site-nav">
                <ul>
                  {/* <li
                    className={
                      this.state.currentTab == "dashboard" ? "active" : ""
                    }
                  >
                    <a
                      href="javaScript:void(0)"
                      onClick={() => this.changeTab("dashboard")}
                    >
                      DashBorad
                    </a>
                  </li> */}
                  <li
                    className={
                      this.state.currentTab == "orderlist" ? "active" : ""
                    }
                  >
                    <a
                      href="javaScript:void(0)"
                      onClick={() => this.changeTab("orderlist")}
                    >
                      OrderList
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
          {this.state.currentTab == "dashboard" && (
            <Row>
              <Col md={12} className="buyer">
                <p className="dashboard-header">Statistics</p>
                <Row className="buyer-stats">
                  <Col md={3}>
                    <h3>100</h3>
                    <h5>Number of orders</h5>
                    <p>+14.00(+0.50%)</p>
                  </Col>
                  <Col md={3}>
                    <h3>$32,451</h3>
                    <h5>Total value of orders</h5>
                    <p>+14.00(+0.50%)</p>
                  </Col>
                  <Col md={3}>
                    <h3>80</h3>
                    <h5>Successfully completed</h5>
                    <p>+14.00(+0.50%)</p>
                  </Col>
                  <Col md={3}>
                    <h3>20</h3>
                    <h5>Rejected Orders</h5>
                    <p>+14.00(+0.50%)</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          {this.state.currentTab == "orderlist" && (
            <div className="order-list-page">
              {this.props.list &&
                !this.props.loading &&
                this.props.list.map((value, i) => {
                  return (
                    <Row key={i} className="order-list-items">
                      <OrderItemList
                        orderContract={value}
                        web3={this.props.accountConnection}
                        history={this.props.history}
                        account={this.props.account}
                        column="3"
                        type={type}
                      ></OrderItemList>
                    </Row>
                  );
                })}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { web3, accountConnection, account, contract } = state.common;
  const { list, loading, error } = state.jobList;
  return {
    activeJobs: state.fetchJobs.activeJobs,
    web3,
    accountConnection,
    account,
    contract,
    list,
    loading,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActiveJobs: (id, flag) => dispatch(fetchActiveJobs(id, flag)),
    getServiceProviderList: (web3, account, contract) =>
      dispatch(getServiceProviderList(web3, account, contract)),
    getClientProviderList: (web3, account, contract) =>
      dispatch(getClientProviderList(web3, account, contract)),
    connectWallet: () => dispatch(connectWallet()),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderList))
);
