import React, { Component , createRef } from "react";
import { connect } from 'react-redux';
import '../../styles/Header.scss';
import Web3 from 'web3';
import {fetchParentCategories} from '../../actions/commonAction';
import {fetchCategories} from '../../actions/categoryActions';
import Dropdown from 'react-bootstrap/Dropdown';
import DropDownMenuItem from '../../components/DropDownMenuItem';



class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            'menuOpen':[]
        }
        this.toggleMenuOpen = this.toggleMenuOpen.bind(this);

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
            this.state.menuOpen[index] = value;
            if(value == true){
                this.props.fetchCategories(id);
            }
            this.setState({ menuOpen: this.state.menuOpen })
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
                    <div className="nav-section">
                        <ul className="nav-items">
                            <li key="catalog" className="nav-item">Catalogue</li>
                            <li key="explore" className="nav-item">Explore</li>
                            <li key="inr" className="nav-item">
                                <button className="btn btn-secondary" onClick={this.navigateToPost.bind(this)}>
                                    Post
                                </button>
                            </li>
                            <li key="connect" className="nav-item">
                                <button className="btn btn-primary" onClick={this.onClick.bind(this)}>
                                    Connect
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {this.props.parentCategories ? 
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
            </div> :''}
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