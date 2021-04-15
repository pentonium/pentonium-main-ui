import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Category.scss';
import Web3 from 'web3';
import {fetchCategories} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom'
import { CategorySideMenu } from "../../controllers/CategorySideMenu";
import { CategoryList } from "../../controllers/CategoryList";
import Pagination  from 'react-bootstrap/Pagination';
import {getJobsList} from '../../actions/jobListActions';
import {connectIfAuthorized} from '../../actions/commonAction';
import CollectionItem from "../CollectionItem";
import { Row, Col , Badge } from 'react-bootstrap';
// import PaginationItem from 'react-bootstrap/PageItem'
// import PaginationLink from 'react-bootstrap/Pagination'



class Categories extends Component {
    constructor(props){
        super(props)
        this.pageSize = 50;
        // this.pagesCount = 0;
        this.dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
            (a, i) => "Record " + (i + 1)
          );
        this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);
        this.state = {
        currentPage: 0,
        offerContract:''
        };
    }

    async componentDidMount(){
        const categoryId = this.props.match.params.id;
        // this.props.fetchCategories(categoryId);
        this.setState({offerContract:categoryId});
        await this.props.connectIfAuthorized();
        if(this.props.account){
            // await this.props.getCategoriesList(this.props.contract , this.props.account);
            await this.props.getJobsList(this.props.contract , this.props.account , this.props.web3 , categoryId);
        }
        // this.pagesCount = Math.ceil(this.props.categories.length / this.pageSize);
        // console.log(this.pagesCount);
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
                { this.props.list &&
                <>
                <div className="col-md-12 parent-cateogory-title text-center">
                    {/* <h1>{this.props.categories.name}</h1>
                    <p>{this.props.categories.text}</p> */}
                </div>
                <div className="row col-md-12 categories-section">
                        {/* <div className="col-md-3">
                            <CategorySideMenu {...this.props.categories}></CategorySideMenu>
                        </div> */}
                        <div className="col-md-12">
                            {/* <CategoryList {...this.props.categories}></CategoryList> */}
                            <Row className="collections">
                                {this.props.list && this.props.list.map((hash , i) => {
                                    return ( hash.ipfs_hash != "" && hash.ipfs_hash !='abhbi' &&
                                        <CollectionItem key={i} index={i} hash={hash}  offerContract={this.state.offerContract}></CollectionItem>
                                    )
                                }) 
                                }
                            </Row>
                            
                            <Pagination aria-label="Page navigation example">
            
                                <Pagination.Item disabled={currentPage <= 0} onClick={e => this.handleClick(e, currentPage - 1)} href="#">
                                
                                </Pagination.Item>

                                {[...Array(this.pagesCount)].map((page, i) => 
                                <Pagination.Item active={i === currentPage} key={i} onClick={e => this.handleClick(e, i)} href="#">
                                    {i + 1}
                                </Pagination.Item>
                                )}

                                <Pagination.Item disabled={currentPage >= this.pagesCount - 1} onClick={e => this.handleClick(e, currentPage + 1)} href="#"> 
                                
                                </Pagination.Item> 
                                
                            </Pagination>
                        </div>
                </div>
                </>
                }
            </div>
         );
    }
}

function mapStateToProps(state){
    const { web3, account, loading, error , contract } = state.common;
    const {list} = state.jobList;
    return {
        categories: state.category.categoryItems,
        web3, account, loading, error , contract,
        list
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchCategories: (id) => dispatch(fetchCategories(id)),
        connectIfAuthorized:() => dispatch(connectIfAuthorized()),
        getJobsList: (contract , account , web3 , offerContract) => dispatch(getJobsList(contract , account , web3 , offerContract))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Categories));