import React, {Component} from 'react';
import IPFSChat from '../../controllers/IPFSChat';
import IPFS from 'ipfs-api';

let IPFSChatInstance = null
let node = null
class ChatPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			visibleDrawer: false,
			makeDrawer: false,
			myName: '',
			myID: '',
			currentMsg: '',
			peers: [],
			selectedPeer: 'global',
			allMessages: {
				'global': []
			}
		}
		IPFSChatInstance = new IPFSChat();
		IPFSChatInstance.getID()
			.then(myID => {
				this.setState({ myID });
			})
			.then(() => {
				IPFSChatInstance.newSubscribe('global', this.globalMsgHandler)
				IPFSChatInstance.newSubscribe('name-service', this.nameServiceHandler)
				IPFSChatInstance.newSubscribe('private-chat', this.privateChatHandler)
			});
		// try 
		// {
		// 	this.initializeNode().then(function(chat){
		// 		chat.on('ready', async () => {
		// 			let nodeID = await node.id();
		// 			// this.ready = true;
		// 			console.log(nodeID);
		// 		})
		// 		console.log('In new');
		// 	});
		// }catch(err){
		// 	console.log(err);
		// }
		// try{
		// 	node.on('ready', async () => {
        //         let nodeID = await node.id();
		// 		// this.ready = true;
		// 		console.log(nodeID);
        //     })
			
		// }catch(error){
		// 	console.log(error);
		// }
		
	}

	initializeNode = () => {
		return new Promise((resolve, reject) => {
		try 
		{
			node = new IPFS({
				EXPERIMENTAL: { pubsub: true },
				repo: (() => `repo-${Math.random()}`)(),
				config: {
					Addresses: {
						Swarm: [
							'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
						]
					}
				}
			});
			resolve(node);
			}catch(err){
				console.log(err);
			}
		})
	}

	componentDidMount(){
		
	}
	
	render(){
		return(
			<div>
				<div id="main">
				<div class="controls">
				<input id="name" type="text" value={this.state.myName}
						placeholder="Pick a name (or remain anonymous)"/>
				</div>
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
		)
	}
}

export default ChatPage