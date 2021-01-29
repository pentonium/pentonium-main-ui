import React, { Component } from "react";
import { connect } from 'react-redux';
import {CollectionCard} from '../controllers/CollectionCard';
import {fetchNewJobs} from '../actions/categoryActions';
import CollectionItem from "./CollectionItem";
import { Row, Col , Badge } from 'react-bootstrap';



class NewCollection extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchNewJobs();
    }

    render() { 
        return (
            <div style={{width:'100%'}}>
            <h2 className="collection-title">Featured Jobs</h2>
            <Row className="collections">
            {this.props.newData && this.props.newData.map((hash , i) => {
                return ( i <=3 &&
                    <CollectionItem index={i} hash={hash.id} column="4"></CollectionItem>
                )
            }) 
            }
            </Row>
            {/* <div className="button-center-container"> 
            {this.props.newData && this.props.newData.length > 4 &&
                <button className="btn btn-outline-primary" onClick={() => viewAllItems()}>View All</button>
            }
            </div> */}
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        newData: state.fetchJobs.newData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchNewJobs: () => dispatch(fetchNewJobs())
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(NewCollection);
