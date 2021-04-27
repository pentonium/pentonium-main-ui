import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchCustomerData} from '../../actions/commonAction';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge , Button } from 'react-bootstrap'
import { CollectionCard } from "../../controllers/CollectionCard";



class DashBoard extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentTab:'buyer'
        }
        this.changeTab = this.changeTab.bind(this);
    }

    componentDidMount(){
       
    }

    navigateToBuyer(){
            window.location.href="/buyer/orderlist";
    }

    changeTab(name){
        this.setState({currentTab:name})
    }

    render() { 
        return (
            <>
                <Row>
                    <Col className="dashboard-menus" md={12}>
                    <nav className="site-nav">
                        <ul>
                        <li className={this.state.currentTab == 'buyer' ? 'active':''}><a href="javaScript:void(0)"  onClick={() => this.changeTab('buyer')} >Buyer</a></li>
                        <li className={this.state.currentTab == 'seller' ? 'active':''}><a href="javaScript:void(0)"  onClick={() => this.changeTab('seller')}>Seller</a></li>
                        </ul>
                    </nav>
                    </Col>
                </Row>
                {this.state.currentTab == 'buyer' &&<Row>
                <Col md={12} className="buyer">
                    <h3>Buyer DashBorad</h3>
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
                    <button className="btn btn-primary" onClick={this.navigateToBuyer.bind(this)}>Check Stats</button>
                </Col>
                </Row>}
                {this.state.currentTab == 'seller' && <Row>
                    <Col md={12} className="seller">
                        <h3>Seller DashBorad</h3>
                        <Row className="seller-stats">
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
                        <button className="btn btn-primary" onClick={this.navigateToBuyer.bind(this)}>Check Stats</button>
                    </Col>
                </Row>
                }
            </>
         );
    }
}

function mapStateToProps(state){
    return {
        customerData: state.common.customerData,
        jobData: state.common.jobData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchCustomerData: (id) => dispatch(fetchCustomerData(id))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(DashBoard));