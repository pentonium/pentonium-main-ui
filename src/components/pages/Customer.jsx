import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCustomerData } from "../../actions/commonAction";
import { withRouter } from "react-router-dom";
import { Row, Col, Badge, Container } from "react-bootstrap";
import { CollectionCard } from "../../controllers/CollectionCard";
import { getUserGigs } from "../../actions/jobActions";
import NewCollection from "../NewCollection";
import CollectionItem from "../CollectionItem";

class Customer extends Component {
    constructor(props){
        super(props);
        this.state = {
            gigData:[],
            loading:true
        }
    }

    async componentDidMount(){
        const customerId = this.props.match.params.customerId;
        // this.props.fetchCustomerData(customerId);
        let data = await getUserGigs(this.props.contract , customerId , this.props.accountConnection);
        this.setState({gigData:data , userAccount:customerId , loading:false});
        console.log('Gig' , this.state.gigData);
    }

    render() { 
        return (
            <>
                <Container style={{'paddingTop':'13rem'}}>
                <Row>
                <Col md={3} lg={3} sm={12} xs={12}>
                    <Row className="top-profile-section">
                        <Col md={12} sm={12} lg={12} xs={12}>
                            <div className="profile-section">
                            <div className="user-image">
                                <img src="https://t3.ftcdn.net/jpg/01/83/55/76/360_F_183557656_DRcvOesmfDl5BIyhPKrcWANFKy2964i9.jpg" alt="user-image"/>
                            </div>
                            <h5>{this.state.userAccount}</h5>
                            {/* <p>{this.props.customerData.status}</p>
                            <p>{this.props.customerData.tokenId}</p> */}
                            </div>
                            {/* <hr /> */}
                            {/* <Row className="seller-demograph">
                                <Col md={6}>From</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.from}</b></Col>
                                <Col md={6}>Member Since</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.since}</b></Col>
                                <Col md={6}>Avg. Response Time</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.avgResponseTime}</b></Col>
                                <Col md={6}>Last Delivery</Col>
                                <Col md={6} className="text-right"><b>{this.props.customerData.lastDelivery}</b></Col>
                            </Row> */}
                        </Col>
                    </Row>
                    {/* <Row className="low-profile-section">
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
                    </Row> */}
                </Col>
                <Col lg={9} md={9} sm={12} xs={12} className="collections-seller">
                        <h1>User Gigs</h1>
                        <Row className="collections">
                        {this.state.gigData && this.state.gigData.length > 0 && 
                            this.state.gigData.map((job, i) => {
                              return (
                                <Col key={i} xs={12} sm={6} md={6} lg={4} className="collections-seller-columns">      
                                <CollectionItem
                                    index={i}
                                    hash={job}
                                    offerContract={job.offerContract}
                                    column="3"
                                ></CollectionItem>
                                </Col>
                              );
                            })
                        }
                        </Row>
                </Col>
                </Row>
                </Container>
            </>
         );
    }
}

function mapStateToProps(state) {
  console.log(state.common);
  const { web3, accountConnection, account, contract } = state.common;
  return {
    // customerData: state.common.customerData,
    // jobData: state.common.jobData,
    web3,
    accountConnection,
    account,
    contract,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCustomerData: (id) => dispatch(fetchCustomerData(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Customer));
