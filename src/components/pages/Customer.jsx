import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Customer.scss';
import {fetchCustomerData} from '../../actions/commonAction';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge } from 'react-bootstrap'
import { CollectionCard } from "../../controllers/CollectionCard";



class Customer extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const customerId = this.props.match.params.customerId;
        this.props.fetchCustomerData(customerId);
        
    }

    render() { 
        return (
            <>
            {this.props.customerData &&
                <>
                <Col md={4}>
                    <Row className="top-profile-section">
                        <Col md={12}>
                            <div className="profile-section">
                            <div class="user-image">
                                <img src={this.props.customerData.image} alt="user-image"/>
                            </div>
                            <h5>{this.props.customerData.name}</h5>
                            <p>{this.props.customerData.status}</p>
                            <p>{this.props.customerData.tokenId}</p>
                            </div>
                            <hr />
                            <Row className="seller-demograph">
                                <Col md={6}>From</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.from}</b></Col>
                                <Col md={6}>Member Since</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.since}</b></Col>
                                <Col md={6}>Avg. Response Time</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.avgResponseTime}</b></Col>
                                <Col md={6}>Last Delivery</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.lastDelivery}</b></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="low-profile-section">
                        <Col md={12}>
                            <h5>Description</h5>
                            <p className="description-text">{this.props.customerData.description}</p>
                            <hr />
                            <h5>Keywords</h5>
                            {
                                this.props.customerData.skills.map((skill , i) => {
                                return <Badge key={i} pill variant="secondary">{skill}</Badge>
                                })
                            }
                        </Col>
                    </Row>
                </Col>
                <Col md={8} className="collections-seller">
                        <h1 style={{textTransform: 'capitalize'}}>{this.props.customerData.name} Gigs</h1>
                        {this.props.jobData && <CollectionCard items={this.props.jobData} column="6"></CollectionCard>}
                </Col>
                </>
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
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Customer));