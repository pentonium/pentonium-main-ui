import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Category.scss';
import {fecthJobByCategory} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom'
import Pagination  from 'react-bootstrap/Pagination';
import {CollectionCard} from '../../controllers/CollectionCard';
import {getJobsList} from '../../actions/jobListActions';
import {connectIfAuthorized} from '../../actions/commonAction';
import { getCategoriesList } from "../../actions/categoryListAction";
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
            await this.props.getCategoriesList(this.props.contract , this.props.account);
            // await this.props.getJobsList(this.props.contract , this.props.account , this.props.web3 , categoryId);
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
                { this.props.categoryList && this.props.categoryList.length > 0 ?
                <>
                    {/* <CollectionCard items={this.props.jobCategory}></CollectionCard> */}
                    <ul className="category-items">
                {this.props.categoryList.map((value, index) => {
                    return (
                        <li key={index}> 
                            {/* <Dropdown onMouseEnter={() => this.toggleMenuOpen(index , true , value.id)}
                            onMouseLeave={() => this.toggleMenuOpen(index , false , value.id)}
                            show={this.state.menuOpen[index]}>       
                                <Dropdown.Toggle variant="success" id="dropdown-basic{index}">
                                    <span >{value.name}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {this.props.categories ? this.props.categories.categories.map((value1 , index) => {
                                    return(<Dropdown.Item href={'/categories/'+value.id + '/' + value1.id}>{value1.name}</Dropdown.Item>)
                                    }): ''}
                                </Dropdown.Menu>
                            </Dropdown> */}
                            <a
                                id={'anchor-nav'+index}
                                // onMouseEnter={() => this.toggleMenuOpen(index , true , value.id)}
                                // onMouseLeave={() => this.toggleMenuClose(index , false , value.id)}
                                aria-controls={value.id}
                                 href={'/categories/'+value.offer_contract}
                            >
                                <span>{value.name}</span>
                                {/* <i id={'chevron'+index}className={"fa fa-chevron-up rotate "}></i> */}
                            </a>
                            {/* <Collapse id={'collapse-id'+index} onMouseEnter={() => this.toggleSubMenu(index , true)} onMouseLeave={() => this.toggleSubMenuOt(index , false)}>
                                <div className="collapse-content" id={value.id}>
                                    <div className="container">
                                {this.props.categories ? this.props.categories.categories.map((value1 , index) => {
                                    return(<div className="nav-submenu"><a  href={'/categories/'+value.id + '/' + value1.id}>{value1.name}</a></div>)
                                }): ''}
                                </div>
                                </div>
                            </Collapse> */}
                        </li>
                        )
                    })}
                    </ul> 
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
    const {categoryList} = state.categoryList;
    return {
        jobCategory: state.fetchJobs.categoryJob,
        web3, account, loading, error , contract,
        categoryList
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fecthJobByCategory: (id) => dispatch(fecthJobByCategory(id)),
        connectIfAuthorized:() => dispatch(connectIfAuthorized()),
        getJobsList: (contract , account , web3 , offerContract) => dispatch(getJobsList(contract , account , web3 , offerContract)),
        getCategoriesList:(contract,account) => dispatch(getCategoriesList(contract,account)),
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Category));