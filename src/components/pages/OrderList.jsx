import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchActiveJobs} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge, Container } from 'react-bootstrap';
import { getClientProviderList , getServiceProviderList } from "../../actions/jobListActions";
import { connectWallet } from "../../actions/commonAction";
import { BUYER, SELLER } from "../../constants";
import OrderItemList from "../../controllers/OrderItemList";



class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab : 'currentJobs',
            currentTab:'dashboard'
        }
        this.changeTab = this.changeTab.bind(this);
        }

    async componentDidMount(){
        await this.props.connectWallet();
        this.getOrderData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.type !== this.props.match.params.type) {
          this.getOrderData();
        }
    }

    getOrderData = async () => {
        const userType = this.props.match.params.type;
        if(userType == BUYER){   
            await this.props.getClientProviderList(this.props.web3 , this.props.account , this.props.contract);
        } else if (userType == SELLER){
            console.log(this.props.web3 , this.props.account);
            await this.props.getServiceProviderList(this.props.web3 , this.props.account , this.props.contract);
        }
    }

    // getJobData(activeTab , flag){
    //     this.props.fetchActiveJobs('123' , flag);
    //     this.setState({activeTab:activeTab});
    // }

    changeTab(name){
        this.setState({currentTab:name})
    }

    render() { 
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
                        <li className={this.state.currentTab == 'dashboard' ? 'active':''}><a href="javaScript:void(0)"  onClick={() => this.changeTab('dashboard')} >DashBorad</a></li>
                        <li className={this.state.currentTab == 'orderlist' ? 'active':''}><a href="javaScript:void(0)"  onClick={() => this.changeTab('orderlist')}>OrderList</a></li>
                        </ul>
                    </nav>
                    </Col>
                </Row>
                {this.state.currentTab == 'dashboard' &&<Row>
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
                </Row>}
                {this.state.currentTab == 'orderlist' &&<Row className="order-list-page">
                <Col md={12}>
                    {this.props.list && !this.props.loading && this.props.list.map((value , i) => {
                        return (
                            <Row key={i} className="order-list-items">   
                                <OrderItemList orderContract={value} web3={this.props.web3} history={this.props.history} account={this.props.account} column="3" type={this.props.match.params.type}></OrderItemList> 
                            </Row>
                        )
                    })  
                    }
                </Col>
                </Row>}
                </Container>
            </div>
         );
    }
}

function mapStateToProps(state){
    const { web3, account, contract } = state.common;
    const { list , loading , error } = state.jobList;
    return {
        activeJobs: state.fetchJobs.activeJobs,
        web3,
        account,
        contract,list , loading , error
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchActiveJobs: (id , flag) => dispatch(fetchActiveJobs(id , flag)),
        getServiceProviderList:(web3 , account,contract) => dispatch(getServiceProviderList(web3 ,account,contract)),
        getClientProviderList:(web3 , account , contract) => dispatch(getClientProviderList(web3,account,contract)),
        connectWallet: () => dispatch(connectWallet())
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(withRouter(OrderList)));