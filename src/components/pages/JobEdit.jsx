import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Form, Button, Container } from "react-bootstrap";
import { fetchParentCategories } from "../../actions/commonAction";
import { fetchCategories } from "../../actions/categoryActions";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ipfs from "../../ipfs";
import { withRouter } from "react-router-dom";
import { fetchData, createNewCategory } from "../../actions/categoryActions";
import { updateJob } from "../../actions/jobActions";
import { getJobDetail } from "../../actions/jobActions";
import { getCategoriesList } from "../../actions/categoryListAction";
import { connectIfAuthorized } from "../../actions/commonAction";
import Spinner from "react-bootstrap/Spinner";
import { NewCategoryModal } from "../modals/NewCategoryModal";

class JobEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      isParentSelected: false,
      title: "",
      duration: 0,
      parentCategory: "",
      category: "",
      description: "",
      tags: [],
      successful: false,
      buffer: "",
      imageHash: "",
      dataHash: "",
      offerContract: "",
      price: 0,
      jobId: 0,
      modalShow: false,
      newcat: "",
      catFormValidated: false,
    };
    this.captureFile = this.captureFile.bind(this);
    this.uploadFormData = this.uploadFormData.bind(this);
    this.getFileData = this.getFileData.bind(this);
    this.handleNewCategorySubmit = this.handleNewCategorySubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  async componentDidMount() {
    // await this.props.connectIfAuthorized();
    await this.props.getCategoriesList(this.props.contract, this.props.account);
    const jobId = this.props.match.params.jobId;
    const offerContract = this.props.match.params.offerContract;
    this.setState({ offerContract: offerContract, jobId: Number(jobId) });
    await this.props.getJobDetail(this.props.web3, jobId, offerContract);
    let jobData = await fetchData(this.props.detailData.ipfs_hash);
    this.setState({
      hashedData: jobData,
      title: jobData.title,
      description: jobData.description,
      duration: jobData.duration,
      parentCategory: jobData.parentCategory,
      imageHash: jobData.imageHash,
      tags: jobData.tags,
      price: jobData.price,
      package: jobData.package,
      features: jobData.features,
    });
  }

  async uploadFormData(imageHashV) {
    const uploadData = {
      title: this.state.title,
      duration: Number(this.state.duration),
      parentCategory: this.state.parentCategory,
      description: this.state.description,
      tags: this.state.tags,
      imageHash: this.state.imageHash,
      price: Number(this.state.price),
      package: this.state.package,
      features: this.state.features,
    };
    ipfs.files.add(
      Buffer.from(JSON.stringify(uploadData)),
      async (error, result) => {
        if (error) {
          return;
        }
        this.setState({ dataHash: result[0].hash });
        await this.props.updateJob(
          this.props.accountConnection,
          this.state.offerContract,
          this.state.dataHash,
          this.state.imageHash[0],
          uploadData.price,
          this.state.jobId,
          this.props.account,
          uploadData.duration
        );
        this.setState({ successful: true });
        // this.getFileData();
      }
    );
  }

  getFileData() {
    ipfs.files.get(this.state.dataHash, (error, result) => {
      // console.log('Data hash' , JSON.parse(result[0].content.toString()));
    });
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.uploadFormData();
    }
    this.setState({ validated: true });
  }

  showModal(flag) {
    this.setState({ modalShow: flag, catFormValidated: false });
  }

  onSelectedOptionsChange(event) {
    const value = event.currentTarget.value;
    this.myChangeHandler(event);
    this.props.fetchCategories(value);
    this.setState({ isParentSelected: true });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam == "duration") {
      if (parseInt(val) !== 0) {
        this.setState({ [nam]: val });
      }
    } else {
      this.setState({ [nam]: val });
    }
  };

  captureFile(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const buffer = Buffer(reader.result);
        ipfs.files.add(buffer, (error, result) => {
          if (error) {
            return;
          }
          this.setState({
            imageHash: [...this.state.imageHash, result[0].hash],
          });
        });
      };
    }
  }

  handleTags = (newTags, type) => {
    if (type == "skills") {
      this.setState({ tags: newTags });
    } else {
      this.setState({ features: newTags });
    }
  };

  async handleNewCategorySubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // this.setState({catFormValidated:true});
      await this.props.createNewCategory(
        this.state.newcat,
        this.props.account,
        this.props.contract
      );
      this.showModal(false);
    }
  }

  render() {
    return (
      <Container className="body-padding">
        <div style={{ maxWidth: "640px", margin: "auto" }}>
          {
            <>
              {!this.state.successful ? (
                <>
                  <NewCategoryModal
                    show={this.state.modalShow}
                    onHide={() => this.showModal(false)}
                    myChangeHandler={this.myChangeHandler}
                    validation={this.state.catFormValidated}
                    handleSubmit={this.handleNewCategorySubmit}
                  ></NewCategoryModal>
                  <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit.bind(this)}
                  >
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        lg="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label>Gig Title</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="title"
                          disabled={this.props.loading}
                          value={this.state.title}
                          placeholder="A Nice Title"
                          onChange={this.myChangeHandler}
                          autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid title.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Duration (In Days):</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="duration"
                          disabled={this.props.loading}
                          placeholder="Duration"
                          value={this.state.duration}
                          onChange={this.myChangeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid duration.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom04"
                      >
                        <Form.Label>Price (In Dai):</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="price"
                          disabled={this.props.loading}
                          placeholder="Price"
                          value={this.state.price}
                          onChange={this.myChangeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid price.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        md="8"
                        controlId="validationCustom03"
                      >
                        <Form.Label>
                          <span>Select Parent Category</span>
                        </Form.Label>
                        <Form.Control
                          required
                          as="select"
                          size="sm"
                          value={this.state.parentCategory}
                          name="parentCategory"
                          disabled={this.props.loading}
                          custom
                          onChange={this.onSelectedOptionsChange.bind(this)}
                        >
                          <option value={""}>Choose...</option>
                          {this.props.categoryList &&
                            this.props.categoryList.map((parent) => {
                              return (
                                <option
                                  key={parent.name}
                                  value={parent.name}
                                  contract={parent.offer}
                                >
                                  {parent.name}
                                </option>
                              );
                            })}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom03"
                      >
                        <Button
                          className="new-category-button"
                          onClick={() => this.showModal(true)}
                          variant="primary"
                          size="sm"
                          disabled={this.props.loading}
                          block
                        >
                          {this.props.loading ? "Loading…" : "New Category"}
                        </Button>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom05"
                      >
                        <Form.Label>Skills</Form.Label>
                        <ReactTagInput
                          tags={
                            this.state.tags.length > 0 ? this.state.tags : []
                          }
                          placeholder="Type and press enter"
                          maxTags={10}
                          editable={true}
                          readOnly={!this.props.loading}
                          removeOnBackspace={true}
                          onChange={(newTags) =>
                            this.handleTags(newTags, "skills")
                          }
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Group
                      controlId="validationCustom08"
                      className="image-selector"
                    >
                      <h6 cla>Selected Images:</h6>
                      {this.state.imageHash &&
                        this.state.imageHash.map((preview, i) => {
                          return (
                            <div class="edit-image" key={i}>
                              <img src={preview} alt="" />
                            </div>
                          );
                        })}
                    </Form.Group>
                    <Form.Group controlId="validationCustom06">
                      <input
                        type="file"
                        disabled={this.props.loading}
                        multiple
                        onChange={this.captureFile}
                      />
                    </Form.Group>
                    <Form.Group controlId="validationCustom07">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={this.state.description}
                        rows={3}
                        disabled={this.props.loading}
                        onChange={this.myChangeHandler}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Description field is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom09">
                      <Form.Label>Package Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="package"
                        value={this.state.package}
                        disabled={this.props.loading}
                        rows={3}
                        onChange={this.myChangeHandler}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Package field is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom10">
                      <Form.Label>Features</Form.Label>
                      <ReactTagInput
                        tags={
                          this.state.features && this.state.features.length > 0
                            ? this.state.features
                            : []
                        }
                        placeholder="Type and press enter"
                        maxTags={15}
                        editable={true}
                        readOnly={this.props.loading}
                        removeOnBackspace={true}
                        onChange={(newTags) =>
                          this.handleTags(newTags, "features")
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      disabled={this.props.loading}
                      className="submit btn btn-block btn-large"
                    >
                      {this.props.loading ? "Loading…" : "Submit"}
                    </Button>
                  </Form>
                </>
              ) : !this.props.error ? (
                <div>
                  <p className="text-center">
                    You're job has been posted successfully
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-center">Error posting the job</p>
                </div>
              )}
            </>
            //  (
            //    <Spinner animation="border" role="status">
            //      <span className="sr-only">Loading...</span>
            //    </Spinner>
            //  )
          }
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { web3, account, contract, accountConnection } = state.common;
  let error = state.jobReducer.error;
  let loading = state.jobReducer.loading;
  const { detailData } = state.jobReducer;
  const { categoryList } = state.categoryList;
  return {
    parentCategories: state.common.parentCategories,
    categories: state.category.categoryItems,
    hashedData: state.fetchJobs.hashedData,
    web3,
    account,
    loading,
    error,
    contract,
    detailData,
    categoryList,
    accountConnection,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchParentCategories: () => dispatch(fetchParentCategories()),
    fetchCategories: (id) => dispatch(fetchCategories(id)),
    fetchHashJobData: (id) => dispatch(fetchData(id)),
    createNewCategory: (name, addr, contract) =>
      dispatch(createNewCategory(name, addr, contract)),
    updateJob: (
      web3,
      contract,
      hash,
      thumbnail,
      price,
      id,
      account,
      duration
    ) =>
      dispatch(
        updateJob(web3, contract, hash, thumbnail, price, id, account, duration)
      ),
    connectIfAuthorized: () => dispatch(connectIfAuthorized()),
    getCategoriesList: (contract, account) =>
      dispatch(getCategoriesList(contract, account)),
    getJobDetail: (web3, id, offerContract) =>
      dispatch(getJobDetail(web3, id, offerContract)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JobEdit)
);
