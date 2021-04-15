import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Category.scss';
import {fecthJobByCategory} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom'
import Pagination  from 'react-bootstrap/Pagination';
import {CollectionCard} from '../../controllers/CollectionCard';
import {getJobsList} from '../../actions/jobListActions';
import {connectIfAuthorized} from '../../actions/commonAction';
// import PaginationItem from 'react-bootstrap/PageItem'
// import PaginationLink from 'react-bootstrap/Pagination'



class Category extends Component {
    constructor(props){
        super(props)
        this.pageSize = 50;
        // this.pagesCount = 0;
        this.dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
            (a, i) => "Record " + (i + 1)
          );
        this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);
        this.state = {
            currentPage: 0
        };
    }

    async componentDidMount(){
        const categoryId = this.props.match.params.categoryId;
        // this.props.fecthJobByCategory(categoryId);
        await this.props.connectIfAuthorized();
        if(this.props.account){
            // await this.props.getCategoriesList(this.props.contract , this.props.account);
            await this.props.getJobsList(this.props.contract , this.props.account , this.props.web3 , categoryId);
        }
    }

    handleClick(e, index) {
    
        e.preventDefault();
    
        this.setState({
          currentPage: index
        });
        
      }

    render() { 
        const { currentPage } = this.state;
        return (
            <div className="row">
                { this.props.jobCategory && this.props.jobCategory.length > 0 ?
                <>
                    <CollectionCard items={this.props.jobCategory}></CollectionCard>
                    <Pagination aria-label="Page navigation example">
            
                                <Pagination.Prev className={currentPage <=0 ? 'hide-arrow':''} disabled={currentPage <= 0} onClick={e => this.handleClick(e, currentPage - 1)} href="#">
                                
                                </Pagination.Prev>

                                {[...Array(this.pagesCount)].map((page, i) => 
                                <Pagination.Item active={i === currentPage} key={i} onClick={e => this.handleClick(e, i)} href="#">
                                    {i + 1}
                                </Pagination.Item>
                                )}

                                <Pagination.Next className = {currentPage >= this.pagesCount - 1 ? 'hide-arrow':''} disabled={currentPage >= this.pagesCount - 1} onClick={e => this.handleClick(e, currentPage + 1)} href="#"> 
                                
                                </Pagination.Next> 
                                
                    </Pagination>
                </>:
                <div>
                    No Items found
                </div>
                }
            </div>
         );
    }
}

function mapStateToProps(state){
    const { web3, account, loading, error , contract } = state.common;
    const {list} = state.jobList;
    return {
        jobCategory: state.fetchJobs.categoryJob,
        web3, account, loading, error , contract,
        list
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fecthJobByCategory: (id) => dispatch(fecthJobByCategory(id)),
        connectIfAuthorized:() => dispatch(connectIfAuthorized()),
        getJobsList: (contract , account , web3 , offerContract) => dispatch(getJobsList(contract , account , web3 , offerContract))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Category));