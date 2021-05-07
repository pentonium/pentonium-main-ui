import { Component } from "react";
import { connect } from "react-redux";
import { Chat } from "../../controllers/Chat";
import { Row, Col, Badge, Container } from "react-bootstrap";
import { BsToggles, BsFileArrowUp } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import { withRouter } from "react-router-dom";
import { BUYER, SELLER } from "../../constants";
import {
  getAddresses,
  getClientProvider,
  getOrderDetail,
  getServiceProvider,
} from "../../actions/orderActions";

class ChatPage extends Component {
  state = {
    msg: "",
    chat: null,
    messages: [],
    usera: "me",
    userb: null,
    loadId: null,
    orderData: {},
  };

  async componentDidMount() {
    this.connectToSkyNet();

    let data = await getOrderDetail(
      this.props.web3,
      this.props.account,
      this.props.match.params.orderContract
    );

    console.log(data.data);
    this.setState({ orderData: data.data });
  }

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

  componentDidUpdate() {
    this.scrollToBottom();
  }

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
          messages: msg.chat,
        });
      }

      let loadId = setInterval(async () => {
        const msg = await that.state.chat.loadMessages();
        if (msg.chat != that.state.messages) {
          that.setState({
            messages: msg.chat,
          });
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
      this.setState({
        msg: "",
      });
      await this.state.chat.waitAndMessage(this.state.msg);
    }
  };

  scrollToBottom() {
    const objDiv = document.getElementById("chat-body-div");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return (
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
                        {msg.msg}
                      </div>
                    </div>
                  </div>
                ))}
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
                  <div className="send-msg-button" onClick={this.sendMessage}>
                    Send
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
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
