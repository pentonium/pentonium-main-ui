import React, { Component , createRef } from "react";
import { connect } from 'react-redux';
import Web3 from 'web3';
import {fetchParentCategories} from '../../actions/commonAction';
import {fetchCategories} from '../../actions/categoryActions';
import Dropdown from 'react-bootstrap/Dropdown';
import Collapse from 'react-bootstrap/Collapse';
import { findSourceMap } from "module";



class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            'menuOpen':[],
            'active':false
        }
        this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this); 
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
        this.toggleMenuClose = this.toggleMenuClose.bind(this);
        this.toggleSubMenuOt = this.toggleSubMenuOt.bind(this);

    }

    componentWillMount(){
        this.props.fetchParentCategories();
    }

    componentDidMount(){
        this.checkLoggedIn();
    }

    async checkLoggedIn(){
        if(window.web3 !== undefined){
            if(window.ethereum){
            const web3 = new Web3(window.ethereum);
            try{
                var loggedIn = await web3.eth.getAccounts();
                if(loggedIn.length > 0){
                    console.log('LoggedIn' , loggedIn);
                    this.setState({active:true});
                } 
            } catch(e){
                console.error(e)
            }
            }
        }
    }

    async connectWithMetaMask() {
        if(window.web3 !== undefined){
            if(window.ethereum){
            const web3 = new Web3(window.ethereum);
            try{
                await window.ethereum.enable();
                var accounts = await web3.eth.getAccounts();
                var firstAcc = accounts[0];
                console.log(firstAcc);
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
            var element = document.getElementById("collapse-id"+index);
            var collapse = document.getElementById("chevron"+index);
            var anchor = document.getElementById("anchor-nav"+index);
            if(value){
                element.classList.add("show");
                collapse.classList.add("down");
                anchor.classList.add("active-anchor");
            }      
    }

    toggleMenuClose(index , value , id){
            setTimeout(() => {
                this.state.menuOpen[index] = value;
                var element = document.getElementById("collapse-id"+index);
                var collapse = document.getElementById("chevron"+index);
                var anchor = document.getElementById("anchor-nav"+index);
                anchor.classList.remove("active-anchor");
                if(!element.classList.contains("sub-hovered")){
                    element.classList.remove("show");
                    collapse.classList.remove("down");
                    this.setState({ menuOpen: this.state.menuOpen })
                }  
            },400);

    }



    toggleSubMenu(index , value){
            var element = document.getElementById("collapse-id"+index);
            var collapse = document.getElementById("chevron"+index);
            var anchor = document.getElementById("anchor-nav"+index);
            if(value){
                element.classList.add("show");
                element.classList.add("sub-hovered");
                collapse.classList.add("down");
            }
          
    }

    toggleSubMenuOt(index,value){
        var element = document.getElementById("collapse-id"+index);
            var collapse = document.getElementById("chevron"+index);
            var anchor = document.getElementById("anchor-nav"+index);
        setTimeout(() => {
            element.classList.remove("sub-hovered");
            if(!anchor.classList.contains("active-anchor")){
                element.classList.remove("show");
                anchor.classList.remove("active-nav");
                collapse.classList.remove("down");
            }
        },300); 
    }

    toggleCollapse(val){
        this.setState({open:val});
    }

    render() { 
        console.log('Render' , this.props);
        return (
            <>
            <header className="header">
                <div className="header-core">
                     <div className="container">
                    <div className="logo-section">
                        <a href="/">
                            <span className="header-logo"></span>
                        </a>    
                    </div>
                    {/* <div className="nav-mid-section">
                        <ul className="nav-items mid">
                        {this.props.parentCategories && this.props.parentCategories.map((value, index) => {
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
                                <a
                                    id={'anchor-nav'+index}
                                    onMouseEnter={() => this.toggleMenuOpen(index , true , value.id)}
                                    onMouseLeave={() => this.toggleMenuClose(index , false , value.id)}
                                    aria-controls={value.id}
                                    className={this.state.menuOpen[index] ? 'active-nav':''}
                                    aria-expanded={this.state.menuOpen[index]}
                                >
                                    <span>{value.name}</span>
                                    <i id={'chevron'+index}className={"fa fa-chevron-up rotate "}></i>
                                </a>
                                <Collapse id={'collapse-id'+index} onMouseEnter={() => this.toggleSubMenu(index , true)} onMouseLeave={() => this.toggleSubMenuOt(index , false)}>
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
                    </div> */}
                    <div className="nav-section">
                            <ul className="nav-items">
                                <li key="inr" className="nav-item">
                                    <button className="btn btn-secondary post-btn" onClick={this.navigateToPost.bind(this)}>
                                        Post
                                    </button>
                                </li>
                                <li key="connect" className="nav-item">
                                    {this.state.active ? (<div className="logo-section">
                                    <a href="/dashboard">
                                        <span className="logged-in-user"></span>
                                    </a>    
                                </div>
                        ): (<button className="btn btn-primary connect-btn" onClick={this.onClick.bind(this)}>
                                        Connect
                                    </button>)}
                                </li>
                            </ul>
                    </div>
                    
                </div>
                </div>
                {this.props.parentCategories ? 
            <div className="parent-nav-section">
                <div className="container">
                <ul className="nav-items">
                {this.props.parentCategories.map((value, index) => {
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
                                id={'anchor-nav'+index}
                                onMouseEnter={() => this.toggleMenuOpen(index , true , value.id)}
                                onMouseLeave={() => this.toggleMenuClose(index , false , value.id)}
                                aria-controls={value.id}
                                className={this.state.menuOpen[index] ? 'active-nav':''}
                                aria-expanded={this.state.menuOpen[index]}
                            >
                                <span>{value.name}</span>
                                <i id={'chevron'+index}className={"fa fa-chevron-up rotate "}></i>
                            </a>
                            <Collapse id={'collapse-id'+index} onMouseEnter={() => this.toggleSubMenu(index , true)} onMouseLeave={() => this.toggleSubMenuOt(index , false)}>
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
            </div> :''}
            </header>
           
            
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