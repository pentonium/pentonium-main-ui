import React, { Component } from "react";
import { connect } from 'react-redux';
import {CollectionCard} from '../controllers/CollectionCard';
import {fetchHighRatedJobs } from '../actions/categoryActions';



class RatedCollection extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
            this.props.fetchHighRatedJobs();
    }

    render() { 
        
        return (
            <div className="collections-content">
                <h2 className="collection-title">High Budgeted Jobs</h2>
                {this.props.ratedData &&
                    <CollectionCard items={this.props.ratedData} link='/collection/highrated'></CollectionCard>
                }
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        ratedData: state.fetchJobs.ratedData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchHighRatedJobs: () => dispatch(fetchHighRatedJobs())
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(RatedCollection);
