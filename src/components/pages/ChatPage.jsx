import React, { Component } from "react";
import IPFSChat from "../../controllers/IPFSChat";
import IPFS from 'ipfs';
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
let IPFSChatInstance = null;
class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDrawer: false,
      makeDrawer: false,
      myName: "",
      myID: "",
      currentMsg: "",
      peers: [],
      selectedPeer: "global",
      allMessages: {
        global: [],
      },
      show:false
    };
    this.connectPeers = this.connectPeers.bind(this);
    this.messageReceived = this.messageReceived.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.subscribeB = this.subscribeB.bind(this);
    this.subscribeA = this.subscribeA.bind(this);
    this.sendMessage  = this.sendMessage.bind(this);
    this.msgHandler = this.msgHandler.bind(this);
  }

  async componentDidMount() {
    IPFSChatInstance = new IPFSChat();
    await IPFSChatInstance.connect();
    const id = await IPFSChatInstance.getID();
    console.log(id);
    this.setState({myID:id});
  }

  messageReceived(msg){
    console.log('Message' , msg);
  }

  connectPeers(){
      this.setState({show:true});
      // IPFSChatInstance.sendNewMsg('demo','hello');
  }

  async subscribeB(){

    IPFSChatInstance.newSubscribe('B' , this.msgHandler);
    this.setState({myID:'A' , myName:'B'})
    // IPFSChatInstance.sendNewMsg('B','Hi from A');
  }

  async subscribeA(){
    IPFSChatInstance.newSubscribe('A' , this.msgHandler);
    this.setState({myID:'B' , myName:'A'});
    // IPFSChatInstance.sendNewMsg('A','Hi from B');
  }

  msgHandler(msg){
    console.log('Message received from' , msg);
  }

  handleClose(){
    this.setState({show:false});
  }

  sendMessage(){
    IPFSChatInstance.sendNewMsg(this.state.myName,`${this.state.myID}` );
  }

  render() {
    return (
      <div>
        <div id="main">
          <div className="controls">
            <input
              id="name"
              type="text"
              value={this.state.myName}
              placeholder="Pick a name (or remain anonymous)"
            />
          </div>

          <button onClick={this.connectPeers}>Send</button>
          <button onClick={this.sendMessage}>Send Message</button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.subscribeB}>
                Close
              </Button>
              <Button variant="primary" onClick={this.subscribeA}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* <div class="output"
					data-bind="foreach: { data: messages, as: 'msg' }">
				<div>
					<a data-bind="text: msg.name,
								css: { local: msg.from === $root.id() },
								attr: { href: `ipfs.io/ipns/${msg.from}` }">
					</a>
					<div data-bind="text: msg.text"></div>
				</div>
				</div>
				<div class="input">
				<input id="text" type="text" placeholder="Type a message"
						data-bind="value: message, enable: subscribed" />
				</div> */}
        </div>
      </div>
    );
  }
}

export default ChatPage;