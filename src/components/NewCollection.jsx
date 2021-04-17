import React, { Component } from "react";
import { connect } from 'react-redux';
import {CollectionCard} from '../controllers/CollectionCard';
import {fetchNewJobs} from '../actions/categoryActions';
import CollectionItem from "./CollectionItem";
import { Row, Col , Badge } from 'react-bootstrap';
import {getJobsList} from '../actions/jobListActions';
import { getCategoriesList } from "../actions/categoryListAction";
import {connectIfAuthorized} from '../actions/commonAction';



class NewCollection extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryContract:''
        }
    }

    async componentDidMount(){
        await this.props.connectIfAuthorized();
        if(this.props.account){
            await this.props.getCategoriesList(this.props.contract , this.props.account);
            this.setState({categoryContract:this.props.categoryList.filter((cat) => cat.name===this.props.categoryName)[0].offer_contract});
            await this.props.getJobsList(this.props.contract , this.props.account , this.props.web3 , this.state.categoryContract);
        }

    }

    viewAllItems = () => {
        window.location.href=`/categories/${this.state.categoryContract}`;
    };

    render() { 
        return (
            <div className="collections-content" style={{width:'100%'}}>
            <h2 className="collection-title">{this.props.categoryName}</h2>
            <Row className="collections">
            {this.props.list && this.props.list.map((hash , i) => {
                return ( i <=3 && hash.ipfs_hash != "" && hash.ipfs_hash !='abhbi' &&
                    <CollectionItem key={i} index={i} hash={hash}  offerContract={this.state.categoryContract} column="3"></CollectionItem>
                )
            }) 
            }
            </Row>
            <div className="button-center-container"> 
            {this.props.list && this.props.list.length > 4 &&
                <button className="btn btn-secondary" onClick={this.viewAllItems}>View All</button>
            }
            </div>
            </div>
         );
    }
}

function mapStateToProps(state){
    const { web3, account, loading, error , contract } = state.common;
    const {list} = state.jobList;
    const {categoryList} = state.categoryList;
    return {
        parentCategories: state.common.parentCategories,
        categories: state.category.categoryItems,
        web3,
        account,
        loading,
        error,
        contract,
        list,
        categoryList,
        newData: state.fetchJobs.newData
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchNewJobs: () => dispatch(fetchNewJobs()),
        connectIfAuthorized:() => dispatch(connectIfAuthorized()),
        getJobsList: (contract , account , web3 , offerContract) => dispatch(getJobsList(contract , account , web3 , offerContract)),
        getCategoriesList:(contract,account) => dispatch(getCategoriesList(contract,account))
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(NewCollection);
