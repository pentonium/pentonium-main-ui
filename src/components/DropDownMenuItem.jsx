import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions/categoryActions";

class DropDownMenuItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const categoryId = this.props.id;
    this.props.fetchCategories(categoryId);
  }

  render() {
    return <div className="row">{this.props.categories}</div>;
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.categoryItems,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (id) => dispatch(fetchCategories(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenuItem);
