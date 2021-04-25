import React, { Component } from "react";
import {  Row } from "react-bootstrap";
import { connect } from 'react-redux';
import NewCollection from "../NewCollection";
import {getAllCategoryJobs} from '../../actions/jobListActions';
import {connectIfAuthorized} from '../../actions/commonAction';
import {home_contract_addresses} from '../../config';

class Home extends Component {

    constructor(props){
        super(props)
        this.state={
            contract:['0x350F4fa7dAbd45CFBdfc8A61ee1E0A5a0E13De3D' , '0xf726830e3721dc764281983e8095053fd44bf500']
        }
        this.getAllCategories = this.getAllCategories.bind(this);
    }

    componentDidMount(){
        this.getAllCategories();
    }

    async getAllCategories(){
        await this.props.connectIfAuthorized();
        await this.props.getAllCategoryJobs(this.props.account , this.props.web3 , home_contract_addresses);
    }
    
    render() { 
        return (
                <Row className="collections-list">
                {
                    this.props.fulllist && this.props.fulllist.map((job , i) => {
                        return <NewCollection key={i} categoryName={job.name} list={job.list} categoryContract={job.offerContract} loading={this.props.loading}></NewCollection>
                    })
                }
                </Row>
         );
    }
}

function mapStateToProps(state){
    console.log('State' , state);
    const { web3, account, loading, error , contract } = state.common;
    const {fulllist } = state.jobList;
    const fulllistloading = state.jobList.loading;
    return {
        web3,
        account,
        loading,
        error,
        contract,
        fulllist,
        fulllistloading
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        connectIfAuthorized:() => dispatch(connectIfAuthorized()),
        getAllCategoryJobs: (account , web3 , offerContract) => dispatch(getAllCategoryJobs(account , web3 , offerContract))
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(Home);