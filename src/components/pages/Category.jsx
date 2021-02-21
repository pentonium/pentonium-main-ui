import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Category.scss';
import {fecthJobByCategory} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom'
import Pagination  from 'react-bootstrap/Pagination';
import {CollectionCard} from '../../controllers/CollectionCard';
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

    componentDidMount(){
        const categoryId = this.props.match.params.categoryId;
        this.props.fecthJobByCategory(categoryId);
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
                { this.props.jobCategory &&
                <>
                    <CollectionCard items={this.props.jobCategory}></CollectionCard>
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
                </>

                }
            </div>
         );
    }
}

function mapStateToProps(state){
    return {
        jobCategory: state.fetchJobs.categoryJob
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fecthJobByCategory: (id) => dispatch(fecthJobByCategory(id))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Category));