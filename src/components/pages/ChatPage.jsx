import { Component } from "react";
import { connect } from "react-redux";
import { Chat } from "../../controllers/Chat";
import { Row, Col, Badge, Container, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { BUYER, SELLER } from "../../constants";
import {
  getAddresses,
  getClientProvider,
  getOrderDetail,
  getServiceProvider,
} from "../../actions/orderActions";
import { Helmet } from "react-helmet";
import { GrAttachment } from "react-icons/gr";
import ipfs from "../../ipfs";


class ChatPage extends Component {
  state = {
    msg: "",
    chat: null,
    messages: [],
    usera: "me",
    userb: null,
    loadId: null,
    orderData: {},
    loading:false
  };

  async componentDidMount() {
    if (this.props.accountConnection) {
      await this.start();
    }
  }

  async componentDidUpdate(props, state) {
    if (this.props.accountConnection != props.accountConnection) {
      await this.start();
    }
  }

  start = async () => {
    this.connectToSkyNet();

    let data = await getOrderDetail(
      this.props.web3,
      this.props.account,
      this.props.match.params.orderContract
    );

    this.setState({ orderData: data.data });
  };

  connectToSkyNet = async () => {
    const userType = this.getUserTpe(this.props.match.url);
    let keys = [];

    let addresses = await getAddresses(
      this.props.accountConnection,
      this.props.match.params.orderContract
    );

    let from = addresses.client;
    let to = addresses.serviceProvider;

    if (userType === BUYER) {
      keys = await getClientProvider(
        this.props.accountConnection,
        this.props.account,
        this.props.match.params.orderContract
      );
    } else {
      keys = await getServiceProvider(
        this.props.accountConnection,
        this.props.account,
        this.props.match.params.orderContract
      );

      from = addresses.serviceProvider;
      to = addresses.client;
    }

    const chat = new Chat(keys[0], keys[1], keys[2], "p2p-chat", from, to);

    this.setState({
      chat: chat,
      userb: to,
      usera: from,
    });

    await this.keepLoadingData();
  };

  getUserTpe = (locationUrl) => {
    let param = locationUrl.split("/")[2];
    return param;
  };

  componentWillUnmount() {
    if (this.state.loadId) {
      clearInterval(this.state.loadId);
    }
  }

  keepLoadingData = async () => {
    const that = this;
    if (this.state.loadId) {
      clearInterval(this.state.loadId);
    }

    if (that.state.chat) {
      const msg = await that.state.chat.loadMessages();
      if (msg.chat != that.state.messages) {
        that.setState({
          messages: msg.chat
        });
      }

      let loadId = setInterval(async () => {
        const msg = await that.state.chat.loadMessages();
        if (msg.chat.toString() != that.state.messages.toString()) {
          that.setState({
            messages: msg.chat,
            loading:false
          });
          this.scrollToBottom();
        }
      }, 5000);

      this.setState({ loadId: loadId });
    }
  };

  handleInput = (e) => {
    this.setState({
      msg: e.target.value,
    });
  };

  sendMessage = async () => {
      if (this.state.msg != "") {
        await this.state.chat.waitAndMessage(this.state.msg, "txt");
        this.setState({
          msg: "",
        });
      }
  };

  scrollToBottom() {
    const objDiv = document.getElementById("chat-body-div");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  upload_file_to_ipfs = (data) => {
    return new Promise((resolve,reject)=>{
      ipfs.files.add(data, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve(result[0].hash);
      });
    });
  }

  attachFile = async (event) => {
    this.setState({loading:true});
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async() => {
      this.scrollToBottom();
      let ipfs_hash = await this.upload_file_to_ipfs(Buffer(reader.result));
      let message = `LINK TO IPFS_HASH : <a href=https://ipfs.io/ipfs/${ipfs_hash} class="" target='_blank'>${ipfs_hash}</a>`;
      await this.state.chat.waitAndMessage(message, "file");
    };
    
  };

  createHtml = (msg) => {
    return {
      __html: msg.msg};
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Chat Page for Order:${this.state.orderData.title}`}</title>
        </Helmet>
        <Container className="body-padding">
          <Row>
            <Col md={4}>
              {this.state.orderData.title && (
                <>
                  <h3>{this.state.orderData.title}</h3>
                  <hr />
                  <h4>{this.state.orderData.price} Dai</h4>
                  <hr />
                  <p>{this.state.orderData.description.substring(0, 200)}..</p>
                </>
              )}
            </Col>
            <Col md={8}>
              <div className="chat-feed">
                <div className="chat-body" id="chat-body-div">
                    {this.state.messages.map((msg, inex) => (
                      <div key={inex} className="message-block">
                        <div className="message-row">
                          <div
                            className={
                              msg.from == this.state.usera
                                ? "chat-right message"
                                : "chat-left message"
                            }
                          >
                            
                            <span dangerouslySetInnerHTML={{ __html: msg.msg }}></span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {this.state.loading &&
                    <div className="chat-loader">
                          <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                    </div>
                    }
                    <br />
                    <br />
                </div>
                
                <div className="message-form-container">
                  <div className="message-form">
                    <textarea
                      className="message-input"
                      onChange={this.handleInput}
                      rows="3"
                      placeholder="Send a message ..."
                      value={this.state.msg}
                    />
                    <div className="attachment-btn">
                      <input type="file" onChange={this.attachFile} disabled={this.state.loading} />
                      <GrAttachment disabled={this.state.loading}
                        size="25px"
                      ></GrAttachment>
                    </div>
                    <div className="send-msg-button" onClick={this.sendMessage}>
                      Send
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
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
    contract,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatPage))
);
