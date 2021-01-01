import React, { Component } from "react";
import { connect } from 'react-redux';
import '../../styles/Header.scss';
import Web3 from 'web3';
import {fetchParentCategories} from '../../actions/commonAction';



class Header extends Component {
    constructor(props){
        super(props)
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

    render() { 
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
                            <li key="inr" className="nav-item">INR</li>
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
                    return <li key={index} className="category-nav"><a href={'/categories/'+value.id}>{value.name}</a></li>
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
        parentCategories: state.common.parentCategories
      };
  }
  
function mapDispatchToProps(dispatch){
    return{
        fetchParentCategories: () => dispatch(fetchParentCategories())
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(Header);