import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/categoryActions";
import { Row, Col, Badge } from "react-bootstrap";
import { getJobDetail } from "../actions/jobActions";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

class CollectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashedData: {},
    };
  }

  async componentDidMount() {
    let jobData = await fetchData(this.props.hash.ipfs_hash);
    this.setState({ hashedData: jobData });
  }

  render() {
    const isLoaded = this.state.hashedData && this.state.hashedData.imageHash;
    return (
      <>
        {
          <Col xs={12} sm={6} md={4} lg={3}>
            <>
              <div className="card">
                {isLoaded ? (
                  <Link
                    to={
                      "/jobs/" +
                      this.props.hash.id +
                      "/" +
                      this.props.offerContract
                    }
                    className="card-img-top"
                  >
                    <img
                      src={`https://ipfs.io/ipfs/${this.state.hashedData.imageHash[0]}`}
                      alt="Card image"
                    />

                    <div className="card-body">
                      <h5 className="card-title">
                        {this.state.hashedData.title}
                      </h5>
                      <div className="card-bottom">
                        <span className="bottom-left">
                          {this.state.hashedData.parentCategory}
                        </span>
                        <br />
                        <span className="price-tag">
                          {this.state.hashedData.price} Dai
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </div>
                )}
              </div>
            </>
          </Col>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    getJobDetail: (web3, id, offerContract) =>
      dispatch(getJobDetail(web3, id, offerContract)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
