import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchActiveJobs} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge } from 'react-bootstrap';
import { OrderItemList } from "../../controllers/OrderItemList";



class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab : 'currentJobs',
            currentTab:'dashboard'
        }
        this.getJobData = this.getJobData.bind(this);
        this.changeTab = this.changeTab.bind(this);
        }

    componentDidMount(){
        this.props.fetchActiveJobs('123' , true);
    }

    getJobData(activeTab , flag){
        this.props.fetchActiveJobs('123' , flag);
        this.setState({activeTab:activeTab});
    }

    changeTab(name){
        this.setState({currentTab:name})
    }

    render() { 
        console.log(this.props);
        return (
            <>
                <Row>
                    {/* <Col md={1}>    
                        <Button variant="primary" className={this.state.currentTab == 'buyer' ? 'active':''} onClick={() => this.changeTab('buyer')}>Buyer</Button>
                    </Col>
                    <Col md={1}>
                    <Button variant="primary" className={this.state.currentTab == 'seller' ? 'active':''} onClick={() => this.changeTab('seller')}>Seller</Button>
                    </Col> */}
                    <Col className="dashboard-menus" md={12}>
                    <nav class="site-nav">
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
                    {this.props.activeJobs &&
                        <OrderItemList items={this.props.activeJobs} link='/collection/featured' column="3"></OrderItemList>
                    }
                </Col>
                </Row>}
            </>
         );
    }
}

function mapStateToProps(state){
    return {
        activeJobs: state.fetchJobs.activeJobs
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchActiveJobs: (id , flag) => dispatch(fetchActiveJobs(id , flag))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(OrderList));