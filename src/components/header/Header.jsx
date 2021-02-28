import React, { Component , createRef } from "react";
import { connect } from 'react-redux';
import Web3 from 'web3';
import {fetchParentCategories} from '../../actions/commonAction';
import {fetchCategories} from '../../actions/categoryActions';
import Dropdown from 'react-bootstrap/Dropdown';
import Collapse from 'react-bootstrap/Collapse';



class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            'menuOpen':[]
        }
        this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this); 

    }

    componentWillMount(){
        this.props.fetchParentCategories();
    }

    async connectWithMetaMask() {
        if(window.web3 !== undefined){
            if(window.ethereum){
            const web3 = new Web3(window.ethereum);
            try{
                await window.ethereum.enable();
                var accounts = await web3.eth.getAccounts();
                var firstAcc = accounts[0];
                this.setState({active:true});       
            } catch(e){
                console.error(e)
            }
            }
        }
    }


    onClick(){
        this.connectWithMetaMask();
    }

    navigateToPost(){
        window.location.href="/post-job";
    }

    toggleMenuOpen(index , value , id){
            this.state.menuOpen.forEach((v,k) => {
                this.state.menuOpen[k] = false;
            })
            this.state.menuOpen[index] = value;
            
            if(value == true){
                this.props.fetchCategories(id);
            }
            this.setState({ menuOpen: this.state.menuOpen })
    }

    toggleCollapse(val){
        this.setState({open:val});
    }

    render() { 
        console.log('Render' , this.props);
        return (
            <>
            <header className="header">
                <div className="container">
                    <div className="logo-section">
                        <a href="/">
                            <span className="header-logo"></span>
                        </a>    
                    </div>
                    <div className="nav-mid-section">
                    <ul className="nav-items mid">
                    {this.props.parentCategories && this.props.parentCategories.map((value, index) => {
                        return (
                            <li> 
                            {/* <Dropdown onMouseEnter={() => this.toggleMenuOpen(index , true , value.id)}
                            onMouseLeave={() => this.toggleMenuOpen(index , false , value.id)}
                            show={this.state.menuOpen[index]}>       
                                <Dropdown.Toggle variant="success" id="dropdown-basic{index}">
                                    <span >{value.name}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {this.props.categories ? this.props.categories.categories.map((value1 , index) => {
                                    return(<Dropdown.Item href={'/categories/'+value.id + '/' + value1.id}>{value1.name}</Dropdown.Item>)
                                    }): ''}
                                </Dropdown.Menu>
                            </Dropdown> */}
                            <a
                                onClick={() => this.toggleMenuOpen(index , !this.state.menuOpen[index] , value.id)}
                                // onMouseLeave={() => this.toggleMenuOpen(index , false , value.id)}
                                aria-controls={value.id}
                                className={this.state.menuOpen[index] ? 'active-nav':''}
                                aria-expanded={this.state.menuOpen[index]}
                            >
                                <span>{value.name}</span>
                                <i className={"fa fa-chevron-up rotate " + (this.state.menuOpen[index] ? "down" : "") }></i>
                            </a>
                            <Collapse  in={this.state.menuOpen[index]}>
                                <div className="collapse-content" id={value.id}>
                                    <div className="container">
                                {this.props.categories ? this.props.categories.categories.map((value1 , index) => {
                                    return(<div className="nav-submenu"><a  href={'/categories/'+value.id + '/' + value1.id}>{value1.name}</a></div>)
                                }): ''}
                                </div>
                                </div>
                            </Collapse>
                            </li>
                        )
                    })}
                    </ul> 
                    </div>
                    <div className="nav-section">
                        <ul className="nav-items">
                            <li key="inr" className="nav-item">
                                <button className="btn btn-secondary post-btn" onClick={this.navigateToPost.bind(this)}>
                                    Post
                                </button>
                            </li>
                            <li key="connect" className="nav-item">
                                <button className="btn btn-primary connect-btn" onClick={this.onClick.bind(this)}>
                                    Connect
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* {this.props.parentCategories ? 
            <div className="parent-nav-section">
                <div className="container">
                <ul className="nav-items">
                {this.props.parentCategories.map((value, index) => {
                    return (
                        <li> 
                        <Dropdown onMouseEnter={() => this.toggleMenuOpen(index , true , value.id)}
                        onMouseLeave={() => this.toggleMenuOpen(index , false , value.id)}
                        show={this.state.menuOpen[index]}>       
                            <Dropdown.Toggle variant="success" id="dropdown-basic{index}">
                                <span >{value.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.props.categories ? this.props.categories.categories.map((value1 , index) => {
                                return(<Dropdown.Item href={'/categories/'+value.id + '/' + value1.id}>{value1.name}</Dropdown.Item>)
                                }): ''}
                            </Dropdown.Menu>
                        </Dropdown>
                        </li>
                    )
                })}
                </ul> 
                </div>        
            </div> :''} */}
            </> 
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
 
export default connect(mapStateToProps , mapDispatchToProps)(Header);