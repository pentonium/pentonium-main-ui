import { Component } from "react";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import {Chat} from '../../controllers/Chat';
import { Row, Col , Badge } from 'react-bootstrap';
import {BsToggles , BsFileArrowUp} from "react-icons/bs";
import {FiUploadCloud} from 'react-icons/fi';
 
class ChatPage extends Component {
  state = {
    msg: "",
    ipfs: null,
    chat: null,
    messages: [],
    usera: "user-1",
    userb: "user-2",
  };

  async componentDidMount(){
    // await this.chatPage("user1", "user2");
    // await this.setData();
  }

  connectToSkyNet = async() => {
    let keys = {
      "user-1" :  "some private text of user 1 test 1",
      "user-2" :  "some private text of user 2 test 2",
    };

    const chat = new Chat(keys[this.state.usera], keys[this.state.userb], this.state.usera, this.state.userb);

    this.setState({
      chat: chat,
    });

    await this.keepLoadingData();
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  keepLoadingData = async() => {
    const that = this;
    setInterval(async() => {
      const msg = await that.state.chat.loadMessages();
      if(msg.chat != that.state.messages){
        that.setState({
          messages: msg.chat
        })
      }
    }, 5000);
  }

  handleInput = (e) =>{
    this.setState({
      msg: e.target.value
    });
  }

  sendMessage = async() => {
    const that = this;
    await this.state.chat.sendMessage(this.state.msg);
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
                {this.state.usera}
              </div>
              <div className="chat-subtitle">
                {this.state.userb}
              </div>
          </div>
          <div className="chat-body" id="chat-body-div">
          {this.state.messages.map((msg, inex) => (
            <div className="message-block">
              <div className="message-row">
                <div className={(msg.from == this.state.usera)? "chat-right message" : "chat-left message" }>
                  {/* <div className="messge"> */}
                  {msg.msg}
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className="message-form-container">
            <div className="message-form">
              <input class="message-input" onChange={this.handleInput} placeholder="Send a message ..." value={this.state.msg}  />
              <span className="image-button"></span>
              {/* <button type="submit" className="send-button">
              </button> */}
              <button type="submit" className="connect" title="Connect"  onClick={this.connectToSkyNet}>
                <FiUploadCloud></FiUploadCloud>
              </button>
              <button type="submit" className="toggle" title="Toggle User"  onClick={this.toggleUser}>
                <BsToggles></BsToggles>
              </button>
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

export default ChatPage;
