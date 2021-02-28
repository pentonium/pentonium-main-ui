import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchJobData} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge } from 'react-bootstrap';
import {fetchData} from '../../actions/categoryActions';
import LazyImage from '../../controllers/LazyImage';
import Carousel from 'react-bootstrap/Carousel';
import { UserPriceDetail } from "../../controllers/UserPriceDetail";


class JobDescription extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const jobId = this.props.match.params.jobId;
        if(jobId == 1 || jobId == 2 || jobId == 3 || jobId == 4 || jobId == 5){    
            this.props.fetchJobData(parseInt(jobId , 10));
        } else{
            
            this.props.fetchHashJobData(jobId);
        }
    }

    render() { 
        console.log('Props' , this.props);
        return (
            <Row className="job-desctiption-page">
            {this.props.jobDescription &&
                    <>
                    <Col md={8} xs={12}>
                        <h1 className="job-title">{this.props.jobDescription.jobTitle}</h1>
                        <div className="customer-data">
                            <a><span className="customer-image"><img  src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/bd375846a2b53df94bc356ffa3458426-1540375416166/be56ddbf-191a-449e-83b7-fd07e3a271bf.jpeg" /></span></a>
                            <a href={"/customers/"+this.props.jobDescription.customerId}><span className="customer-name">{this.props.jobDescription.customerName}</span></a>
                        </div>
                        <div className="job-details">
                            <div className="job-image">
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
                        <UserPriceDetail></UserPriceDetail>
                    </Col>
                    </>
            }
            {this.props.hashedData &&
                    <>
                    <Col md={8} xs={12}>
                        <h1>{this.props.hashedData.title}</h1>
                        <div className="customer-data">
                            <a><span className="customer-image"><img  src='https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/bd375846a2b53df94bc356ffa3458426-1540375416166/be56ddbf-191a-449e-83b7-fd07e3a271bf.jpeg' /></span></a>
                            <a href={"/customers/"+this.props.hashedData.customerId}><span className="customer-name">{this.props.hashedData.title}</span></a>
                        </div>
                        <div className="job-details">
                            <div className="job-image">
                            <Carousel>    
                            {this.props.hashedData.imageHash && this.props.hashedData.imageHash.map((preview , i) => {
                                return (
                                    <Carousel.Item>
                                        <LazyImage
                                        key={i}
                                        src={`https://ipfs.io/ipfs/${preview}`}
                                        alt="EDdit image"
                                        />
                                    </Carousel.Item>
                                )
                            })}       
                            </Carousel>
                            <img src={this.props.hashedData.image}/>
                            </div>
                            <div>
                                <h4>About Job:</h4>
                                <p>{this.props.hashedData.description}</p>
                            </div>
                            <div>
                                <h5>Skills Required:</h5>
                                {
                                    this.props.hashedData.tags.map((skill) => {
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
        jobDescription: state.fetchJobs.jobDescription[0],
        hashedData: state.fetchJobs.hashedData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchJobData: (id) => dispatch(fetchJobData(id)),
        fetchHashJobData: (id) => dispatch(fetchData(id))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(JobDescription));