import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchJobData } from "../../actions/categoryActions";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Badge, Container } from "react-bootstrap";
import { fetchData } from "../../actions/categoryActions";
import LazyImage from "../../controllers/LazyImage";
import Carousel from "react-bootstrap/Carousel";
import { UserPriceDetail } from "../../controllers/UserPriceDetail";
import Button from "react-bootstrap/Button";
import { deleteJob, getJobDetail, placeOrder } from "../../actions/jobActions";
import { getCategoriesList } from "../../actions/categoryListAction";
import { connectIfAuthorized } from "../../actions/commonAction";
import Spinner from "react-bootstrap/Spinner";
import { genKeyPairFromSeed } from "skynet-js";

class JobDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashedData: {},
      offerContract: "",
      jobId: "",
    };
  }

  async componentDidMount() {
    await this.props.connectIfAuthorized();
    await this.props.getCategoriesList(this.props.contract, this.props.account);
    const jobId = this.props.match.params.jobId;
    const offerContract = this.props.match.params.offerContract;
    this.setState({ offerContract: offerContract, jobId: jobId });
    await this.props.getJobDetail(this.props.web3, jobId, offerContract);
    let jobData = await fetchData(this.props.detailData.ipfs_hash);
    this.setState({ hashedData: jobData });
  }

  deleteJob = async () => {
    const jobId = this.props.match.params.jobId;
    const offerContract = this.props.match.params.offerContract;
    await this.props.deleteJob(
      this.props.web3,
      offerContract,
      this.props.account,
      jobId
    );
  };

  makeid = (length) => {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  };

  placeOrder = () => {
    const serviceProvider = this.makeid(200);
    const cientProvider = this.makeid(200);
    let { publicKey } = genKeyPairFromSeed(serviceProvider);
    let { privateKey } = genKeyPairFromSeed(cientProvider);
    const jobId = this.props.match.params.jobId;
    const offerContract = this.props.match.params.offerContract;
    this.props.placeOrder(
      this.props.account,
      this.props.web3,
      jobId,
      offerContract,
      publicKey,
      privateKey
    );
  };

  naviageToUpdate = () => {
    this.props.history.push(
      `/editdata/${this.state.jobId}/${this.state.offerContract}`
    );
  };

  render() {
    return (
      <Container className="body-padding">
        <Row className="job-desctiption-page">
          {!this.props.loading &&
          this.state.hashedData &&
          this.state.hashedData.imageHash ? (
            <>
              <Col md={8} xs={12}>
                <h1>{this.state.hashedData.title}</h1>
                <div className="customer-data">
                  <a>
                    <span className="customer-image">
                      <img src="/static/media/768px-MetaMask_Fox.svg.a7610ce1.png" />
                    </span>
                  </a>
                  <Link to={"/customers/" + this.state.hashedData.customerId}>
                    <span className="customer-name">{this.props.account}</span>
                  </Link>
                </div>
                <div className="job-details">
                  <div className="job-image">
                    <Carousel
                      controls={this.state.hashedData.imageHash.length > 1}
                      indicators={false}
                    >
                      {this.state.hashedData.imageHash &&
                        this.state.hashedData.imageHash.map((preview, i) => {
                          return (
                            <Carousel.Item key={i}>
                              {/* <LazyImage
                                        key={i}
                                        src={`https://ipfs.io/ipfs/${preview}`}
                                        alt="EDdit image"
                                        /> */}
                              <img
                                src={`https://ipfs.io/ipfs/${preview}`}
                                alt="Description Card image"
                              />
                            </Carousel.Item>
                          );
                        })}
                    </Carousel>
                    <img src={this.state.hashedData.image} />
                  </div>
                  <div>
                    <h4>About Job:</h4>
                    <p>{this.state.hashedData.description}</p>
                  </div>
                  <div>
                    <h5>Skills Required:</h5>
                    {this.state.hashedData.tags &&
                      this.state.hashedData.tags.map((skill, i) => {
                        return (
                          <Badge key={i} pill variant="secondary">
                            {skill}
                          </Badge>
                        );
                      })}
                  </div>
                </div>
              </Col>
              <Col md={4} xs={12}>
                {this.state.hashedData && (
                  <UserPriceDetail
                    hashId={this.state.jobId}
                    offerContract={this.state.offerContract}
                    data={this.state.hashedData}
                    deleteHandler={this.deleteJob}
                    navigateToUpdate={this.naviageToUpdate}
                    placeOrderHandler={this.placeOrder}
                  ></UserPriceDetail>
                )}
              </Col>
            </>
          ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  let loading = true;
  loading = state.jobReducer.loading;
  const { web3, account, contract } = state.common;
  const { detailData, error } = state.jobReducer;
  return {
    jobDescription: state.fetchJobs.jobDescription[0],
    hashedData: state.fetchJobs.hashedData,
    web3,
    account,
    loading,
    error,
    contract,
    detailData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobData: (id) => dispatch(fetchJobData(id)),
    fetchHashJobData: (id) => dispatch(fetchData(id)),
    deleteJob: (web3, contract, account, id) =>
      dispatch(deleteJob(web3, contract, account, id)),
    connectIfAuthorized: () => dispatch(connectIfAuthorized()),
    getCategoriesList: (contract, account) =>
      dispatch(getCategoriesList(contract, account)),
    getJobDetail: (web3, id, offerContract) =>
      dispatch(getJobDetail(web3, id, offerContract)),
    placeOrder: (
      account,
      web3,
      id,
      offerContract,
      clientPorvider,
      serviceProvider
    ) =>
      dispatch(
        placeOrder(
          account,
          web3,
          id,
          offerContract,
          clientPorvider,
          serviceProvider
        )
      ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(JobDescription))
);
