import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Category.scss';
import Web3 from 'web3';
import {fetchCategories} from '../../actions/categoryActions';
import { withRouter } from 'react-router-dom'
import { CategorySideMenu } from "../../controllers/CategorySideMenu";
import { CategoryList } from "../../controllers/CategoryList";



class Categories extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const categoryId = this.props.match.params.id;
        this.props.fetchCategories(categoryId);
    }

    render() { 
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