import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchJobData} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom';
import { Row, Col , Badge } from 'react-bootstrap';
import {fetchData} from '../../actions/categoryActions';
import LazyImage from '../../controllers/LazyImage';
import Carousel from 'react-bootstrap/Carousel';
import { UserPriceDetail } from "../../controllers/UserPriceDetail";
import Button from 'react-bootstrap/Button';
import {deleteJob, getJobDetail} from '../../actions/jobActions';
import { getCategoriesList } from "../../actions/categoryListAction";
import {connectIfAuthorized} from '../../actions/commonAction';


class JobDescription extends Component {
    constructor(props){
        super(props);
        this.state={
            hashedData:{},
            offerContract:"",
            jobId:''
        }
    }

    async componentDidMount(){
        await this.props.connectIfAuthorized();
        await this.props.getCategoriesList(this.props.contract , this.props.account);
        const jobId = this.props.match.params.jobId;
        const offerContract = this.props.match.params.offerContract;
        this.setState({offerContract:offerContract , jobId:jobId});
        // if(jobId == 1 || jobId == 2 || jobId == 3 || jobId == 4 || jobId == 5){    
        //     this.props.fetchJobData(parseInt(jobId , 10));
        // } else{
            //
            await this.props.getJobDetail(this.props.web3 , jobId , offerContract);
            let jobData = await fetchData(this.props.detailData.ipfs_hash);
            this.setState({hashedData:jobData});
        // }
    }

    deleteJob = () =>{
        this.props.deleteJob(this.props.match.params.jobId)
    }

    render() { 
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
                            <Button style={{'margin-top':'20px'}}variant="primary" size="md" onClick={this.deleteJob}>
                                Delete Gig
                            </Button>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        <UserPriceDetail></UserPriceDetail>
                    </Col>
                    </>
            }
            {this.state.hashedData &&
                    <>
                    <Col md={8} xs={12}>
                        <h1>{this.state.hashedData.title}</h1>
                        <div className="customer-data">
                            <a><span className="customer-image"><img  src='https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/bd375846a2b53df94bc356ffa3458426-1540375416166/be56ddbf-191a-449e-83b7-fd07e3a271bf.jpeg' /></span></a>
                            <a href={"/customers/"+this.state.hashedData.customerId}><span className="customer-name">{this.state.hashedData.title}</span></a>
                        </div>
                        <div className="job-details">
                            <div className="job-image">
                            <Carousel>    
                            {this.state.hashedData.imageHash && this.state.hashedData.imageHash.map((preview , i) => {
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
                            <img src={this.state.hashedData.image}/>
                            </div>
                            <div>
                                <h4>About Job:</h4>
                                <p>{this.state.hashedData.description}</p>
                            </div>
                            <div>
                                <h5>Skills Required:</h5>
                                {
                                    this.state.hashedData.tags && this.state.hashedData.tags.map((skill) => {
                                    return <Badge pill variant="secondary">{skill}</Badge>
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={4} xs={12}>
                        {
                            this.props.detailData && 
                            <UserPriceDetail hashId={this.state.jobId} offerContract={this.state.offerContract}></UserPriceDetail>
                        }
                    </Col>
                    </>
            }
            </Row>
         );
    }
}

function mapStateToProps(state){
    const { web3, account, loading, error , contract  } = state.common;
    const {detailData} = state.jobReducer;
    return {
        jobDescription: state.fetchJobs.jobDescription[0],
        hashedData: state.fetchJobs.hashedData,
        web3,
        account,
        loading,
        error,
        contract,detailData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchJobData: (id) => dispatch(fetchJobData(id)),
        fetchHashJobData: (id) => dispatch(fetchData(id)),
        deleteJob:(id) => dispatch(deleteJob(id)),
        connectIfAuthorized:() => dispatch(connectIfAuthorized()),
        getCategoriesList:(contract,account) => dispatch(getCategoriesList(contract,account)),
        getJobDetail:(web3 , id , offerContract) => dispatch(getJobDetail(web3 , id , offerContract))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(JobDescription));