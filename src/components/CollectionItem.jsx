import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchData} from '../actions/categoryActions';
import { Row, Col , Badge } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import LazyImage from '../controllers/LazyImage';


class CollectionItem extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchHashJobData(this.props.hash);
    }

    render() { 
        return (
            <>
                {this.props.hashedData &&
                    <Col key={this.props.index} md={this.props.column ? parseInt(this.props.column , 10) : 3} xs={12}> 
                    <>   
                    <div className="card">
                        <Carousel>
                            {this.props.hashedData.imageHash && this.props.hashedData.imageHash.map((image , i) => {
                                
                                return(
                                    <Carousel.Item className="card-img-top">
                                        <LazyImage
                                            key={i}
                                            src={`https://ipfs.io/ipfs/${image}`}
                                            alt="Card image"
                                        />
                                    {/* <img class="card-img-top" key={i} src={`https://ipfs.io/ipfs/${image}`} alt="Card image" /> */}
                                    </Carousel.Item>
                                )  
                            })}
                        </Carousel>
                        <a href={'/jobs/'+this.props.hash}>
                        <div className="card-body">
                        <h5 className="card-title">{this.props.hashedData.title}</h5>
                        <p className="card-text">{this.props.hashedData.description}</p>
                        <p className="card-text"><small className="text-muted">'$' + {this.props.hashedData.duration}</small>
                        <button className="btn btn-primary"><a href={`/editData/${this.props.hash}`}>Edit</a></button></p>
                        </div>
                        </a>
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
        hashedData: state.fetchJobs.hashedData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchHashJobData: (id) => dispatch(fetchData(id))
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(CollectionItem);