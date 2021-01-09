import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col , Badge , InputGroup , Form , Button} from 'react-bootstrap'
import '../../styles/JobDescription.scss';
import {fetchParentCategories} from '../../actions/commonAction';
import {fetchCategories} from '../../actions/categoryActions';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";


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
            successful:false
        }
    }

    componentDidMount(){
      this.props.fetchParentCategories();
    }
        
      
    handleSubmit(event){
          const form = event.currentTarget;
          event.preventDefault();
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            this.setState({successful:true});
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
            <Form.Group controlId="validationCustom06">
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
            <Form.Group controlId="validationCustom06">
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