import IPFS from 'ipfs';
import BufferPackage from 'buffer';
import Room from 'ipfs-pubsub-room'

const Buffer = BufferPackage.Buffer;

let room = null;
export default class IPFSChat{

    constructor(){
        this.ready = false;
        this.node = null;
    }

    async connect() {
        if(!this.node){
            this.node = await IPFS.create(
                {
                    EXPERIMENTAL: { pubsub: true },
                    repo: (() => `repo-${Math.random()}`)()
                });   
            this.ready = true;    
        }
    }
    
    

    // node.on('ready', async () => {
    //     const version = await node.version()

    //     console.log('Version:', version.version)

    //     const filesAdded = await node.add({
    //         path: 'hello.txt',
    //         content: Buffer.from('Hello World 101 by lalosh')
    //     })

    //     console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
    // })
    async  uploadFile(fileName, fileContent){
    	if(!this.ready) return;

    	  const filesAdded = await this.node.add({
            path: fileName,
            content: Buffer.from(fileContent)
        });

		  console.log('file link',`https://ipfs.io/ipfs/${filesAdded[0].hash}`)

		return `https://ipfs.io/ipfs/${filesAdded[0].hash}`;
    }
    
    async getID() {
        return await this.node.id()
    }

    newSubscribe(topic, receiveMsg) {
        if (!this.ready) return;

        this.node.pubsub.subscribe(topic, receiveMsg, (error) => {
            if (error) {
                console.error(`failed to subscribe to ${topic}, ${error}`)
            }
            console.log(`subscribed to ${topic}`)
        })
        // room = new Room(this.node , 'pubsub-demo');
        // room.on('peer joined' , (peer) => console.log('peer joined' , peer));

    }

    getPeers(topic) {

        return new Promise((resolve, reject) => {
            if (!this.ready) reject('');

            // console.log('looking for peers');

            this.node.pubsub.peers(topic, (error, peersIDs) => {
                if (error) {
                    reject(`failed to get peers subscribed to ${topic}, ${error}`)
                }
                // console.log('found these peers', peersIDs)
                resolve(peersIDs)
            })

        })
    }


    sendNewMsg(topic, newMsg) {
    	console.log('sendNewMsg received: ', newMsg)
        // const msg = Buffer.from(newMsg)

        this.node.pubsub.publish(topic, newMsg, (err) => {
            if (err) {
                return console.error(`failed to publish to ${topic}`, err)
            }
            // msg was broadcasted
            console.log(`published to ${topic}`)
        })
        // room.on('message' , (message) => console.log('got message from' , message.from));
    }

    // return {
    //     newSubscribe,
    //     getID,
    //     getPeers,
    //     sendNewMsg,
    //     uploadFile
    // }
}