import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col , Badge , InputGroup , Form , Button} from 'react-bootstrap';
import {fetchParentCategories} from '../../actions/commonAction';
import {fetchCategories} from '../../actions/categoryActions';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ipfs from '../../ipfs';


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
            successful:false,
            imageArray:[],
            buffer:"",
            imageHash:[],
            dataHash:"",
            previewImage:[]
        }
        this.captureFile = this.captureFile.bind(this);
        this.uploadFormData = this.uploadFormData.bind(this);
        this.getFileData = this.getFileData.bind(this);
    }

    componentDidMount(){
      this.props.fetchParentCategories();
    }

    uploadFormData(){
        const uploadData = {
          title:this.state.title,
          duration:this.state.duration,
          parentCategory:this.state.parentCategory,
          category:this.state.category,
          description:this.state.description,
          tags:this.state.tags,
          imageHash:this.state.imageHash
        }
        // const buffer = Buffer(uploadData);
        ipfs.files.add(Buffer.from(JSON.stringify(uploadData)) , (error , result)=>{
          console.log('Errror' , error , result)
          if(error){
            return
          }
          this.setState({dataHash:result[0].hash});
          this.getFileData();
        });
      } 


      getFileData(){
        ipfs.files.get(this.state.dataHash , (error , result) => {
          console.log('Data hash' , JSON.parse(result[0].content.toString()));
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
                  console.log(this.state.imageHash , result);
                  this.uploadFormData();
              });
            });
            
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
        const file = event.target.files[i];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          this.setState({imageArray: [...this.state.imageArray, Buffer(reader.result)] })
          this.setState({previewImage:[...this.state.previewImage, URL.createObjectURL(file)]})
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
                    {this.props.parentCategories &&
                      this.props.parentCategories.map((parent) => {
                      return <option key={parent.id} value={parent.id}>{parent.name}</option>
                      })
                    } 
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Control required as="select" size="sm" name="category" defaultValue="{''}" onChange={this.myChangeHandler} custom disabled={!this.state.isParentSelected}>
                    <option value={''}>Choose...</option>   
                    {this.props.categories &&
                      this.props.categories.categories.map((category) => {
                      return <option key={category.id} value={category.id}>{category.name}</option>
                      })
                    } 
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="validationCustom05">
            <Form.Label>Enter your keywords</Form.Label>  
            <ReactTagInput 
                tags={this.state.tags} 
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
    return {
      parentCategories: state.common.parentCategories,
      categories: state.category.categoryItems
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
      fetchParentCategories: () => dispatch(fetchParentCategories()),
      fetchCategories: (id) => dispatch(fetchCategories(id))
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(JobPost);