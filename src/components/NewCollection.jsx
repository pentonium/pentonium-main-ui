import React, { Component } from "react";
import { connect } from "react-redux";
import { CollectionCard } from "../controllers/CollectionCard";
import { fetchNewJobs } from "../actions/categoryActions";
import CollectionItem from "./CollectionItem";
import { Row, Col, Badge } from "react-bootstrap";
import { getJobsList } from "../actions/jobListActions";
import { getCategoriesList } from "../actions/categoryListAction";
import { connectIfAuthorized } from "../actions/commonAction";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router";

class NewCollection extends Component {
  constructor(props) {
    super(props);
  }

  viewAllItems = () => {
    this.props.history.push(`/categories/${this.props.categoryContract}`);
  };

  render() {
    return (
      <>
        <div className="collections-content" style={{ width: "100%" }}>
          <h2 className="collection-title">{this.props.categoryName}</h2>
          <Row className="collections">
            {this.props.list ? (
              this.props.list.map((hash, i) => {
                return (
                  i <= 3 &&
                  hash.ipfs_hash != "" &&
                  hash.ipfs_hash != "abhbi" && (
                    <CollectionItem
                      key={i}
                      index={i}
                      hash={hash}
                      offerContract={this.props.categoryContract}
                      column="3"
                    ></CollectionItem>
                  )
                );
              })
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </Row>
          <div className="button-center-container">
            {this.props.list && this.props.list.length > 4 && (
              <button className="btn btn-secondary" onClick={this.viewAllItems}>
                View All
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(NewCollection);
