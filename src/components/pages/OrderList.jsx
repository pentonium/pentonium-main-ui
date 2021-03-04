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
            activeTab : 'currentJobs'
        }
        this.getJobData = this.getJobData.bind(this);
        }

    componentDidMount(){
        this.props.fetchActiveJobs('123' , true);
    }

    getJobData(activeTab , flag){
        this.props.fetchActiveJobs('123' , flag);
        this.setState({activeTab:activeTab});

    }

    render() { 
        console.log(this.props);
        return (
            <>
                <Row className="order-list-page">
                <Col md={12}>
                    {this.props.activeJobs &&
                        <OrderItemList items={this.props.activeJobs} link='/collection/featured' column="3"></OrderItemList>
                    }
                </Col>
                </Row>
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