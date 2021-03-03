import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchCustomerData} from '../../actions/commonAction';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge } from 'react-bootstrap'
import { CollectionCard } from "../../controllers/CollectionCard";



class DashBoard extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
       
    }

    navigateToBuyer(){
            window.location.href="/buyer/orderlist";
    }

    render() { 
        return (
            <>
                <Row>
                <Col md={6}>
                    <p>Buyer DashBorad</p>
                    <button className="btn btn-primary" onClick={this.navigateToBuyer.bind(this)}>Check Stats</button>
                </Col>
                <Col md={6} className="collections-seller">
                    <p>Seller DashBoard</p>
                    <button className="btn btn-primary">Check Stats</button>
                </Col>
                </Row>
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