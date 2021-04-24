import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchData} from '../actions/categoryActions';
import { Row, Col , Badge } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import LazyImage from '../controllers/LazyImage';
import { getJobDetail } from "../actions/jobActions";
import Spinner from 'react-bootstrap/Spinner';


class CollectionItem extends Component {
    constructor(props){
        super(props);
        this.state={
            'hashedData':{}
        }
    }

    async componentDidMount(){
        let jobData = await fetchData(this.props.hash.ipfs_hash);
        this.setState({hashedData:jobData});
    }

    render() { 
        return (
            <>
                {
                    <Col key={this.props.index} md={this.props.column ? parseInt(this.props.column , 10) : 3} xs={12}> 
                    <>   
                    <div className="card">
                        {this.state.hashedData && this.state.hashedData.imageHash ?
                            <a href={'/jobs/'+this.props.hash.id +'/'+this.props.offerContract}>
                            <img className="card-img-top" src={`https://ipfs.io/ipfs/${this.state.hashedData.imageHash[0]}`}  alt="Card image" />
                            {/* <Carousel controls={this.state.hashedData.imageHash.length > 1} indicators={false}>
                                {this.state.hashedData.imageHash && this.state.hashedData.imageHash.map((image , i) => {
                                    
                                    return(
                                        <Carousel.Item key={i} className="card-img-top">
                                            <img   src={`https://ipfs.io/ipfs/${this.state.hashedData.imageHash[0]}`} alt="Card image" />
                                        </Carousel.Item>
                                    )  
                                })}
                            </Carousel> */}
                            <div className="card-body">
                            <h5 className="card-title">{this.state.hashedData.title}</h5>
                            <p className="card-text">{this.state.hashedData.description}</p>
                            {/* <p className="card-text"><small className="text-muted">{`$${this.state.hashedData.price}`}</small>
                            <button className="btn btn-primary"><a href={'/jobs/'+this.props.hash.id +'/'+this.props.offerContract}>Edit</a></button></p> */}
                            <div className="card-bottom">
                                <span className="bottom-left">{this.state.hashedData.parentCategory}</span>
                                <span className="price-tag">{`$${this.state.hashedData.price}`}</span>
                            </div>
                            </div>
                            </a>:
                             <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        
                    </div>
                    </>
                </Col>
                }
            </>
         );
    }
}

function mapStateToProps(state){
    return {
        // hashedData: state.fetchJobs.hashedData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        getJobDetail : (web3 , id , offerContract) => dispatch(getJobDetail(web3 , id , offerContract))
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(CollectionItem);