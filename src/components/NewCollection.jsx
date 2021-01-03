import React, { Component } from "react";
import { connect } from 'react-redux';
import {CollectionCard} from '../controllers/CollectionCard';
import {fetchNewJobs} from '../actions/categoryActions';



class NewCollection extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchNewJobs();
    }

    render() { 
        
        return (
            <div>
                {this.props.newData &&
                    <CollectionCard items={this.props.newData} link='/collection/featured'></CollectionCard>
                }
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
