import React, { Component } from "react";
import { connect } from 'react-redux';
import {CollectionCard} from '../controllers/CollectionCard';
import {fetchFeaturedJobs} from '../actions/categoryActions';


class FeaturedCollection extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchFeaturedJobs();
    }

    render() { 
        
        return (
            <div className="collections-content">
                <h2 className="collection-title">Featured Jobs</h2>
                {this.props.featuredData &&
                    <CollectionCard items={this.props.featuredData} link='/collection/featured' column="3"></CollectionCard>
                }
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        featuredData: state.fetchJobs.featuredData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchFeaturedJobs: () => dispatch(fetchFeaturedJobs())
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(FeaturedCollection);
