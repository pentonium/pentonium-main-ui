import React, { Component } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router";
import JobCard from "./common/JobCard";

class NewCollection extends Component {
  constructor(props) {
    super(props);
  }

  viewAllItems = () => {
    this.props.history.push(`/list/${this.props.categoryContract}`);
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
                    <Col key={i} xs={12} sm={6} md={4} lg={3}>
                      <JobCard
                        index={i}
                        hash={hash}
                        offerContract={this.props.categoryContract}
                        column="3"
                      ></JobCard>
                    </Col>
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
