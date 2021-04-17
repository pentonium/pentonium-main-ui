import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col , Badge , InputGroup , Form , Button} from 'react-bootstrap';
import {fetchParentCategories , connectIfAuthorized} from '../../actions/commonAction';
import {createNewCategory, fetchCategories} from '../../actions/categoryActions';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ipfs from '../../ipfs';
import Web3 from 'web3';
import {postJob} from '../../actions/jobActions';
import { getCategoriesList } from "../../actions/categoryListAction";


class JobPost extends Component {
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
            features:[],
            price:0,
            successful:false,
            imageArray:[],
            buffer:"",
            imageHash:[],
            dataHash:"",
            previewImage:[],
            offerContract:'',
            package:''
        }
        this.captureFile = this.captureFile.bind(this);
        this.uploadFormData = this.uploadFormData.bind(this);
        this.getFileData = this.getFileData.bind(this);
        this.loadWeb3 = this.loadWeb3.bind(this);
    }

    async componentDidMount(){
      // this.props.fetchParentCategories();
        await this.props.connectIfAuthorized();
        await this.props.getCategoriesList(this.props.contract , this.props.account);
    }

    async loadWeb3() {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
      }
    }
    

    uploadFormData(){
        const uploadData = {
          title:this.state.title,
          duration:Number(this.state.duration),
          parentCategory:this.state.parentCategory,
          category:this.state.category,
          description:this.state.description,
          tags:this.state.tags,
          imageHash:this.state.imageHash,
          price:Number(this.state.price),
          package:this.state.package,
          features:this.state.features
        }
        // console.log('Upload Data' , uploadData);
        // const buffer = Buffer(uploadData);
        ipfs.files.add(Buffer.from(JSON.stringify(uploadData)) , (error , result)=>{
          if(error){
            return
          }
          this.setState({dataHash:result[0].hash});
          // const accounts = await window.web3.eth.getAccounts();
          // storehash.methods.
          this.props.postJob(this.props.web3 , this.state.dataHash , this.state.imageHash , this.props.account , this.props.account , this.state.offerContract , uploadData.price);
          // this.props.createNewCategory('Graphics' , this.props.account , this.props.contract);
          this.getFileData();
        });
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
            this.state.imageArray.map((hash) => {
              ipfs.files.add(hash,(error , result) => {
                  if(error){
                    return
                  }
                  this.setState({'imageHash':[...this.state.imageHash , result[0].hash]});
                  this.uploadFormData();
              });
            });
            
          }
          this.setState({validated:true});
    };

    onSelectedOptionsChange(event){
        const value = event.currentTarget.value;
        this.myChangeHandler(event);
        // this.props.fetchCategories(value);
        let filteredCategory = this.props.categoryList.filter((cat) => {
           if (cat.name === value){
             return cat
           }
        });
        this.setState({offerContract:filteredCategory[0].offer_contract});
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
        const file = event.target.files[i];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          this.setState({imageArray: [...this.state.imageArray, Buffer(reader.result)] })
          this.setState({previewImage:[...this.state.previewImage, URL.createObjectURL(file)]})
        }
      }
    }

    handleTags = (newTags , type) => {
        if(type == 'skills'){
          this.setState({tags:newTags});
        } else {
          this.setState({features:newTags});
        }
    }

    render() {
        return (
            <div style = {{'width':'100%'}}>
              {
                !this.state.successful ? 
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Gig Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="Enter title for your gig"
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
                  value={this.state.duration}
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
                    <Form.Control required as="select" size="sm" name="parentCategory" defaultValue="{''}" custom onChange={this.onSelectedOptionsChange.bind(this)} >
                    <option value={''}>Choose...</option>   
                    {this.props.categoryList &&
                      this.props.categoryList.map((parent) => {
                      return <option key={parent.name} value={parent.name} contract={parent.offer}>{parent.name}</option>
                      })
                    } 
                    </Form.Control>
                </Form.Group>
                {/* <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Control required as="select" size="sm" name="category" defaultValue="{''}" onChange={this.myChangeHandler} custom disabled={!this.state.isParentSelected}>
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
                  value={this.state.price}
                  onChange={this.myChangeHandler}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid price.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="validationCustom05">
            <Form.Label>Skills</Form.Label>  
            <ReactTagInput 
                tags={this.state.tags} 
                placeholder="Type and press enter"
                maxTags={10}
                editable={true}
                readOnly={false}
                removeOnBackspace={true}
                onChange={(newTags) => this.handleTags(newTags , 'skills')}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom08">
                <h6>Selected Images:</h6>  
                {this.state.previewImage && this.state.previewImage.map((preview) => {
                  return <img className="edit-image" style={{'width':'200px','height':'100px','marginRight':'10px','marginBottom':'10px'}} src={preview} alt="" />
                })}   
            </Form.Group>
            <Form.Group controlId="validationCustom06">
                    <input type="file" multiple onChange={this.captureFile} />
            </Form.Group>
            <Form.Group controlId="validationCustom07">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" rows={3} onChange={this.myChangeHandler} required />
                <Form.Control.Feedback type="invalid">
                  Description field is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom09">
                <Form.Label>Package Content</Form.Label>
                <Form.Control as="textarea" name="package" rows={3} onChange={this.myChangeHandler} required/>
                <Form.Control.Feedback type="invalid">
                  Package field is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom10">
            <Form.Label>Features</Form.Label>  
            <ReactTagInput 
                tags={this.state.features} 
                placeholder="Type and press enter"
                maxTags={15}
                editable={true}
                readOnly={false}
                removeOnBackspace={true}
                onChange={(newTags) => this.handleTags(newTags , 'features')}
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>:
          <div>
            <p className="text-center">You're job has been posted successfully</p>
            {this.state.imageHash && this.state.imageHash.map((preview) => {
                  return <img src={`https://ipfs.io/ipfs/${preview}`} alt="" />
                })}
          </div>
              }
            </div>
            
         );
    }
}

function mapStateToProps(state){
  const { contract, account , web3 } = state.common;
  const { id, category_name, loading, error } = state.category;
  const {categoryList} = state.categoryList;
  return {
    parentCategories: state.common.parentCategories,
    categories: state.category.categoryItems,
    contract, account, id, category_name, loading, error,
    categoryList,
    web3
    };
  }
  
function mapDispatchToProps(dispatch){
    return{
      fetchParentCategories: () => dispatch(fetchParentCategories()),
      fetchCategories: (id) => dispatch(fetchCategories(id)),
      postJob:(contract , hash , thumbnail , provider  , account , offerContract , price) => dispatch(postJob(contract , hash , thumbnail , provider  , account , offerContract , price)),
      createNewCategory:(name , addr , contract) => dispatch(createNewCategory(name , addr , contract)),
      getCategoriesList:(contract,account) => dispatch(getCategoriesList(contract,account)),
      connectIfAuthorized:() => dispatch(connectIfAuthorized())
      
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(JobPost);