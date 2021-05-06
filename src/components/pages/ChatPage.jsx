import { Component } from "react";
import { connect } from "react-redux";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import {Chat} from '../../controllers/Chat';
import { Row, Col , Badge } from 'react-bootstrap';
import {BsToggles , BsFileArrowUp} from "react-icons/bs";
import {FiUploadCloud} from 'react-icons/fi';
import { withRouter } from "react-router-dom";
import { BUYER, SELLER } from "../../constants";
import { getClientProvider, getServiceProvider } from "../../actions/orderActions";
 
class ChatPage extends Component {
  state = {
    msg: "",
    ipfs: null,
    chat: null,
    messages: [],
    usera: "me",
    userb: "user-2",
  };

  async componentDidMount(){
    // await this.chatPage("user1", "user2");
    // await this.setData();
    this.connectToSkyNet();
  }

  connectToSkyNet = async() => {
    // let keys = {
    //   "user-1" :  "some private text of user 1 test 1",
    //   "user-2" :  "some private text of user 2 test 2",
    // };
    const userType = this.getUserTpe(this.props.match.url);
    let otheruser = '';
    if(userType === BUYER){
      otheruser = SELLER
    } else {
      otheruser = BUYER
    }
    let keys = await getServiceProvider(this.props.accountConnection , this.props.account , this.props.match.params.orderContract);
    const chat = new Chat(keys[0] , keys[1] , keys[2] , this.props.orderContract, this.props.account+'', otheruser);

    this.setState({
      chat: chat,
      userb:otheruser,
      usera:this.props.account
    });

    await this.keepLoadingData();
  }

  getUserTpe = (locationUrl) => {
    let param = locationUrl.split("/")[2]
    return param;
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  keepLoadingData = async() => {
    const that = this;
    // setInterval(async() => {
      const msg = await that.state.chat.loadMessages();
      if(msg.chat != that.state.messages){
        that.setState({
          messages: msg.chat,
          msg:''
        })
      }
    // }, 3000);
  }

  handleInput = (e) =>{
    this.setState({
      msg: e.target.value
    });
  }

  sendMessage = async() => {
    const that = this;
    await this.state.chat.sendMessage(this.state.msg);
    await this.keepLoadingData();
  }

  scrollToBottom() {
    const objDiv = document.getElementById('chat-body-div');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  toggleUser = () => {
    this.setState({
      usera: "user-2",
      userb: "user-1",
    })
  }

  render() {

    return (
      <>
        <div className="chat-feed">
          <div className="chat-title-container">
              <div className="chat-title">
                Me
              </div>
              <div className="chat-subtitle">
                {this.state.userb}
              </div>
          </div>
          <div className="chat-body" id="chat-body-div">
          {this.state.messages.map((msg, inex) => (
            <div key={inex} className="message-block">
              <div className="message-row">
                {msg.from}
                <div className={(msg.from == this.state.usera)? "chat-right message" : "chat-left message" }>
                  {/* <div className="messge"> */}
                  {msg.msg}
                  {this.state.usera}
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className="message-form-container">
            <div className="message-form">
              <textarea className="message-input" onChange={this.handleInput} placeholder="Send a message ..." value={this.state.msg}  />
              <span className="image-button"></span>
              {/* <button type="submit" className="send-button">
              </button> */}
              {/* <button type="submit" className="connect" title="Connect"  onClick={this.connectToSkyNet}>
                <FiUploadCloud></FiUploadCloud>
              </button>
              <button type="submit" className="toggle" title="Toggle User"  onClick={this.toggleUser}>
                <BsToggles></BsToggles>
              </button> */}
              <button type="submit" className="send-msg-button" title="Send Message" onClick={this.sendMessage}>
                <BsFileArrowUp></BsFileArrowUp>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { web3, accountConnection, account, contract } = state.common;
  return {
    activeJobs: state.fetchJobs.activeJobs,
    web3,
    accountConnection,
    account,
    contract
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatPage))
);
