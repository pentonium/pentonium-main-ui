import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Badge, Container } from "react-bootstrap";
import { fetchData } from "../../actions/categoryActions";
import Carousel from "react-bootstrap/Carousel";
import { deleteJob, getJobDetail, placeOrder } from "../../actions/jobActions";
import Spinner from "react-bootstrap/Spinner";
import { genKeyPairFromSeed } from "skynet-js";
import { UserPriceDetail } from "../UserPriceDetail.jsx";
import { Helmet } from "react-helmet";

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
      this.props.accountConnection,
      offerContract,
      this.props.account,
      jobId
    );
    this.props.history.push("/");
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

  placeOrder = async () => {
    const cientProvider = this.makeid(200);
    let { publicKey, privateKey } = genKeyPairFromSeed(cientProvider);
    const jobId = this.props.match.params.jobId;
    const offerContract = this.props.match.params.offerContract;
    this.props.placeOrder(
      this.props.account,
      this.props.accountConnection,
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
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Description of Job:${this.state.hashedData.title}`}</title>
        </Helmet>
        <Container className="body-padding">
          {!this.props.loading &&
          this.state.hashedData &&
          this.state.hashedData.imageHash ? (
            <Row className="job-desctiption-page">
              <Col md={8} xs={12}>
                <h1>{this.state.hashedData.title}</h1>
                <div className="customer-data">
                  <a>
                    <span className="customer-image">
                      <img src="https://t3.ftcdn.net/jpg/01/83/55/76/360_F_183557656_DRcvOesmfDl5BIyhPKrcWANFKy2964i9.jpg" />
                    </span>
                  </a>
                  <Link
                    to={"/customers/" + this.props.detailData.service_provider}
                  >
                    <span className="customer-name">
                      {this.props.detailData.service_provider}
                    </span>
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
                  <br />
                  <div>
                    <h4>About Job:</h4>
                    <p className="ws-pl">{this.state.hashedData.description}</p>
                  </div>
                  <br />
                  <div>
                    <h5>Skills:</h5>
                    {this.state.hashedData.tags &&
                      this.state.hashedData.tags.map((skill, i) => {
                        return (
                          <Badge key={i} pill variant="secondary">
                            {skill}
                          </Badge>
                        );
                      })}
                  </div>
                  <br />
                </div>
              </Col>
              <Col md={4} xs={12}>
                {this.state.hashedData && (
                  <UserPriceDetail
                    hashId={this.state.jobId}
                    offerContract={this.state.offerContract}
                    data={this.state.hashedData}
                    deleteHandler={this.deleteJob}
                    loader={this.props.jobloader}
                    navigateToUpdate={this.naviageToUpdate}
                    placeOrderHandler={this.placeOrder}
                    account={this.props.account}
                    provider={this.props.detailData.service_provider}
                  ></UserPriceDetail>
                )}
              </Col>
            </Row>
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </Container>
      </>
    );
  }
}

function mapStateToProps(state) {
  let loading = true;
  loading = state.jobReducer.loading;
  const { web3, accountConnection, account, contract } = state.common;
  const { detailData, error, jobloader } = state.jobReducer;
  return {
    jobDescription: state.fetchJobs.jobDescription[0],
    hashedData: state.fetchJobs.hashedData,
    web3,
    accountConnection,
    account,
    loading,
    error,
    contract,
    detailData,
    jobloader,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHashJobData: (id) => dispatch(fetchData(id)),
    deleteJob: (web3, contract, account, id) =>
      dispatch(deleteJob(web3, contract, account, id)),
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
