import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchJobData} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge } from 'react-bootstrap'
import '../../styles/JobDescription.scss';


class JobDescription extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const jobId = this.props.match.params.jobId;
        if(jobId){    
            this.props.fetchJobData(parseInt(jobId , 10));
        }
    }

    render() { 
        return (
            <Row className="job-desctiption-page">
            {this.props.jobDescription &&
                    <>
                    <Col md={8} xs={12}>
                        <h1>{this.props.jobDescription.jobTitle}</h1>
                        <div className="customer-data">
                            <a><span class="customer-image"><img  src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/bd375846a2b53df94bc356ffa3458426-1540375416166/be56ddbf-191a-449e-83b7-fd07e3a271bf.jpeg" /></span></a>
                            <a href={"/customers/"+this.props.jobDescription.customerId}><span className="customer-name">{this.props.jobDescription.customerName}</span></a>
                        </div>
                        <div className="job-details">
                            <div class="job-image">
                            <img src={this.props.jobDescription.image}/>
                            </div>
                            <div>
                                <h4>About Job:</h4>
                                <p>{this.props.jobDescription.description}</p>
                            </div>
                            <div>
                                <h5>Skills Required:</h5>
                                {
                                    this.props.jobDescription.skills.map((skill) => {
                                    return <Badge pill variant="secondary">{skill}</Badge>
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <h4>About Coustomer</h4>
                    </Col>
                    </>
            }
            </Row>
         );
    }
}

function mapStateToProps(state){
    return {
        jobDescription: state.fetchJobs.jobDescription[0]
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchJobData: (id) => dispatch(fetchJobData(id))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(JobDescription));