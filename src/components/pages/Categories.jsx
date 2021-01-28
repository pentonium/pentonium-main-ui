import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Category.scss';
import Web3 from 'web3';
import {fetchCategories} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom'
import { CategorySideMenu } from "../../controllers/CategorySideMenu";
import { CategoryList } from "../../controllers/CategoryList";
import Pagination  from 'react-bootstrap/Pagination'
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
        currentPage: 0
        };
    }

    componentDidMount(){
        const categoryId = this.props.match.params.id;
        this.props.fetchCategories(categoryId);
        
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
                { this.props.categories &&
                <>
                <div className="col-md-12 parent-cateogory-title text-center">
                    <h1>{this.props.categories.name}</h1>
                    <p>{this.props.categories.text}</p>
                </div>
                <div className="row col-md-12 categories-section">
                        <div className="col-md-3">
                            <CategorySideMenu {...this.props.categories}></CategorySideMenu>
                        </div>
                        <div className="col-md-9">
                            <CategoryList {...this.props.categories}></CategoryList>
                            
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
    return {
        categories: state.category.categoryItems
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchCategories: (id) => dispatch(fetchCategories(id))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Categories));