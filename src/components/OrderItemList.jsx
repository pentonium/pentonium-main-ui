import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/categoryActions";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { getOrderDetail, updateOrderStatus } from "../actions/orderActions";
import {
  BUYER,
  ORDER_ACCEPTED,
  ORDER_CANCELLED,
  ORDER_CREATED,
  ORDER_MESSAGES,
  ORDER_REJECTED,
} from "../constants";

class OrderItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: {},
      loading: true,
    };
  }

  async componentDidMount() {
    let data = await getOrderDetail(
      this.props.web3,
      this.props.account,
      this.props.orderContract
    );
    this.setState({ orderData: data, loading: false });
  }

  acceptOrder = async () => {
    let data = await updateOrderStatus(
      this.props.web3,
      this.props.account,
      this.props.orderContract,
      ORDER_ACCEPTED
    );
    this.setState({ orderData: data, loading: false });
  };

  rejectOrder = async () => {
    let data = await updateOrderStatus(
      this.props.web3,
      this.props.account,
      this.props.orderContract,
      ORDER_REJECTED
    );
    this.setState({ orderData: data, loading: false });
  };

  cancelOrder = async () => {
    let data = await updateOrderStatus(
      this.props.web3,
      this.props.account,
      this.props.orderContract,
      ORDER_CANCELLED
    );
    this.setState({ orderData: data, loading: false });
  };

  navigateToChatPage = () => {
    if (this.state.orderData.status == ORDER_MESSAGES[ORDER_ACCEPTED]) {
      this.props.history.push(
        `/chatpage/${this.props.type}/${this.props.orderContract}`
      );
    }
  };

  render() {
    return (
      <>
        {this.state.orderData && !this.state.loading ? (
          <Col md={12} xs={12} onClick={this.navigateToChatPage}>
            <Row className="order-item-row">
              <Col md={2} sm={2}>
                <div className="img-col">
                  <img
                    className="list-image"
                    src={`https://ipfs.io/ipfs/${this.state.orderData.data.imageHash[0]}`}
                    alt="Card image"
                  />
                </div>
              </Col>
              <Col md={8} sm={8}>
                <Row>
                  <Col md={6} sm={6}>
                    <p className="order-item-title">
                      {this.state.orderData.data.title}
                    </p>
                    <p className="order-item-text">
                      {this.state.orderData.data.description}
                    </p>
                  </Col>
                  <Col md={3}>
                    <p className="order-item-title">
                      {this.state.orderData.data.duration} days
                    </p>
                    <p className="order-item-text">Duration</p>
                  </Col>
                  <Col md={3}>
                    {this.state.orderData.status ==
                    ORDER_MESSAGES[ORDER_CREATED] ? (
                      this.props.type == BUYER ? (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={this.cancelOrder}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={this.acceptOrder}
                            block
                          >
                            Accept
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={this.rejectOrder}
                            block
                          >
                            Reject
                          </Button>
                        </>
                      )
                    ) : (
                      <>
                        <p className="order-item-title">
                          {this.state.orderData.status}
                        </p>
                        <p className="order-item-text">Current Status</p>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col md={2} sm={2}>
                <p className="order-item-price">
                  {this.state.orderData.data.price}
                </p>
                <p className="order-subtext">Per Hour</p>
              </Col>
            </Row>
          </Col>
        ) : (
          <Col sm={12}>
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </Col>
        )}
      </>
    );
  }
}

export default OrderItemList;
