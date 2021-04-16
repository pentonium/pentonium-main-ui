import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col , Badge , InputGroup , Form , Button} from 'react-bootstrap';
import {fetchParentCategories} from '../../actions/commonAction';
import {fetchCategories} from '../../actions/categoryActions';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ipfs from '../../ipfs';
import { withRouter } from 'react-router-dom';
import {fetchData} from '../../actions/categoryActions';
import LazyImage from '../../controllers/LazyImage';
import {updateJob} from '../../actions/jobActions';
import {deleteJob, getJobDetail} from '../../actions/jobActions';
import { getCategoriesList } from "../../actions/categoryListAction";
import {connectIfAuthorized} from '../../actions/commonAction';


class JobEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            validated : false,
            isParentSelected:false,
            title:"",
            duration:0,
            parentCategory:"",
            category:"",
            description:"",
            tags:[],
            successful:false,
            buffer:"",
            imageHash:"",
            dataHash:"",
            offerContract:'',
            price:'',
            jobId:''
        }
        this.captureFile = this.captureFile.bind(this);
        this.uploadFormData = this.uploadFormData.bind(this);
        this.getFileData = this.getFileData.bind(this);
    }

    async componentDidMount(){
        await this.props.connectIfAuthorized();
        await this.props.getCategoriesList(this.props.contract , this.props.account);
        const jobId = this.props.match.params.jobId;
        const offerContract = this.props.match.params.offerContract;
        this.setState({offerContract:offerContract , jobId:jobId});
        await this.props.getJobDetail(this.props.web3 , jobId  , offerContract);
        let jobData = await fetchData(this.props.detailData.ipfs_hash);
        this.setState({hashedData:jobData ,title:jobData.title , description:jobData.description , duration:jobData.duration,
                  parentCategory:jobData.parentCategory ,imageHash:jobData.imageHash , tags:jobData.tags , price:jobData.price});
    }

    componentDidUpdate(prevProps){
        // if(prevProps.hashedData !== this.props.hashedData){
        //     if(this.props.hashedData){
        //         this.props.fetchCategories(this.props.hashedData.parentCategory);
        //         this.setState({title:this.props.hashedData.title , description:this.props.hashedData.description , duration:this.props.hashedData.duration,
        //         parentCategory:this.props.hashedData.parentCategory ,imageHash:this.props.hashedData.imageHash , tags:this.props.hashedData.tags , isParentSelected:true})
        //     }
        // }
        // if(prevProps.categories !== this.props.categories){
        //   if(this.props.categories){
        //     this.setState({category:this.props.hashedData.category});
        //   }
        // }
    }

    uploadFormData(imageHashV){
        const uploadData = {
          title:this.state.title,
          duration:this.state.duration,
          parentCategory:this.state.parentCategory,
          description:this.state.description,
          tags:this.state.tags,
          imageHash:this.state.imageHash[0],
          price:parseInt(this.state.price)
        }
        // ipfs.files.add(Buffer.from(JSON.stringify(uploadData)) , (error , result)=>{
        //   if(error){
        //     return
        //   }
        //   this.setState({dataHash:result[0].hash});
          console.log('Sttae' ,this.state);
        //   this.props.updateJob(this.props.web3 , this.state.offerContract , this.state.dataHash , this.state.imageHash[0] ,this.state.price , this.state.jobId , this.props.account );
        //   this.getFileData();
        // });
      } 


      getFileData(){
        ipfs.files.get(this.state.dataHash , (error , result) => {
          // console.log('Data hash' , JSON.parse(result[0].content.toString()));
        })
      }

        
      
    handleSubmit(event){
          const form = event.currentTarget;
          event.preventDefault();
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            this.setState({successful:true});
            this.uploadFormData();
          }
          this.setState({validated:true});
    };

    onSelectedOptionsChange(event){
        const value = event.currentTarget.value;
        this.myChangeHandler(event);
        this.props.fetchCategories(value);
        this.setState({isParentSelected:true});
    }

    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      if(nam == 'duration'){
        if(parseInt(val) !== 0) {
          this.setState({[nam]: val});
        }
      } else {
        this.setState({[nam]: val});
      }
    }

    captureFile(event){

      for(let i = 0;i < event.target.files.length ; i++){
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          const buffer = Buffer(reader.result);
          ipfs.files.add(buffer,(error , result) => {
            if(error){
              return
            }
            this.setState({'imageHash':[...this.state.imageHash , result[0].hash]});
        });
      }
    }


    }

    handleTags = (newTags) => {
        this.setState({tags:newTags});
    }

    render() {
        return (
            <div style = {{'width':'100%'}}>
              {
                !this.state.successful && this.state.hashedData ? 
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Gig Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="Enter title for your gig"
                  value={this.state.title ? this.state.title : this.state.hashedData.title}
                  onChange={this.myChangeHandler}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid title.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Duration (in months):</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="duration"
                  placeholder="Duration"
                  value={this.state.duration ? this.state.duration : this.state.hashedData.duration}
                  onChange={this.myChangeHandler}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid duration.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Select Parent Category</Form.Label>
                    <Form.Control required as="select" size="sm" name="parentCategory" value={this.state.hashedData.parentCategory}  custom onChange={this.onSelectedOptionsChange.bind(this)} >
                    <option value={''}>Choose...</option>   
                    {this.props.categoryList &&
                      this.props.categoryList.map((parent) => {
                      return <option key={parent.id} value={parent.id}>{parent.name}</option>
                      })
                    } 
                    </Form.Control>
                </Form.Group>
                {/* <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Control required as="select" size="sm" name="category" value={this.state.category}  custom  onChange={this.myChangeHandler} >
                    <option value={''}>Choose...</option>   
                    {this.props.categories &&
                      this.props.categories.categories.map((category) => {
                      return <option key={category.id} value={category.id}>{category.name}</option>
                      })
                    } 
                    </Form.Control>
                </Form.Group> */}
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                  <Form.Label>Price (in dollar):</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={this.state.price ? this.state.price :this.state.hashedData.price}
                    onChange={this.myChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid price.
                  </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="validationCustom05">
            <Form.Label>Enter your keywords</Form.Label>  
            <ReactTagInput 
                tags={this.state.tags.length > 0 ? this.state.tags : this.state.hashedData.tags} 
                placeholder="Type and press enter"
                maxTags={10}
                editable={true}
                readOnly={false}
                removeOnBackspace={true}
                onChange={(newTags) => this.handleTags(newTags)}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom08">
                <h6>Selected Images:</h6>  
                <div className="lazy-loaded-images">
                {this.state.imageHash && this.state.imageHash.map((preview , i) => {
                  return <LazyImage
                  key={i}
                  src={`https://ipfs.io/ipfs/${preview}`}
                  alt="EDdit image"
                  />
                  // <img className="edit-image" style={{'width':'200px','marginRight':'10px','marginBottom':'10px'}} src={`https://ipfs.io/ipfs/${preview}`} alt="" />
                })}  
                </div> 
            </Form.Group>
            <Form.Group controlId="validationCustom06">
                    <h6>Upload New Image</h6>  
                    <input type="file" multiple onChange={this.captureFile} />
            </Form.Group>
            <Form.Group controlId="validationCustom07">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" value={this.state.hashedData.description} rows={3} onChange={this.myChangeHandler} required />
                <Form.Control.Feedback type="invalid">
                  Description field is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>:
          <div>
            <p className="text-center">You're job has been posted successfully</p>
            {this.state.imageHash && <img src={`https://ipfs.io/ipfs/${this.state.imageHash}`} alt="" />}
          </div>
              }
            </div>
            
         );
    }
}

function mapStateToProps(state){
  const { web3, account, loading, error , contract  } = state.common;
  const {detailData} = state.jobReducer;
  const {categoryList} = state.categoryList;
    return {
      parentCategories: state.common.parentCategories,
      categories: state.category.categoryItems,
      hashedData: state.fetchJobs.hashedData,
      web3,
      account,
      loading,
      error,
      contract,detailData,categoryList
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
      fetchParentCategories: () => dispatch(fetchParentCategories()),
      fetchCategories: (id) => dispatch(fetchCategories(id)),
      fetchHashJobData: (id) => dispatch(fetchData(id)),
      updateJob:(web3 , contract , hash , thumbnail , price , id , account) => dispatch(updateJob(web3 , contract , hash , thumbnail , price , id , account)),
      connectIfAuthorized:() => dispatch(connectIfAuthorized()),
      getCategoriesList:(contract,account) => dispatch(getCategoriesList(contract,account)),
      getJobDetail:(web3 , id , offerContract) => dispatch(getJobDetail(web3 , id , offerContract))
    }
}
 
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(JobEdit));