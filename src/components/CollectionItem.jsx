import React, { Component } from "react";
import { connect } from 'react-redux';
import {fetchData} from '../actions/categoryActions';
import { Row, Col , Badge } from 'react-bootstrap';


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
                    <a>   
                    <div className="card">
                        <img class="card-img-top" src={`https://ipfs.io/ipfs/${this.props.hashedData.imageHash}`} alt="Card image" />
                        <div class="card-body">
                        <h5 class="card-title">{this.props.hashedData.title}</h5>
                        <p class="card-text">{this.props.hashedData.description}</p>
                        <p class="card-text"><small class="text-muted">{this.props.hashedData.duration}</small>
                        <button class="btn btn-primary"><a href={'/editData'}>Edit</a></button></p>
                        </div>
                    </div>
                    </a>
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