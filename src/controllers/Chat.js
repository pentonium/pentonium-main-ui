import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import { BUYER, SELLER } from "../constants";

export class Chat{


    constructor(user1privateKey, user1publicKey ,  user2PublicKey,  topic , from, to){
        this.client = new SkynetClient("https://skyportal.xyz");


        this.publicKey = user1publicKey;
        this.privateKey = user1privateKey;

        this.publicKey2 = user2PublicKey;

        this.from = from;
        this.to = to;
        this.topic = topic;
    }

    async loadMessages(){
        this.loadMessage = true;
        let error = false;
        this.messages = {chat: []};
        let message1 = await this.loadUser1Messages();
        let message2 = await this.loadUser2Messages();

        let min_let = Math.min(message1.length, message2.length);

        // check if old messages are not altered
        for(let i = 0; i < min_let; i++){
            if(JSON.stringify(message1[i]) != JSON.stringify(message2[i])){
                error = true;
                console.log("Old message altered");
                break;
            }
        }

        // check if new messages are only from user 2
        if(message1.length < message2.length){
            for(let i = message1.length; i < message2.length; i++){
                if(message2[i].from != this.to || message2[i].to != this.from){
                    error = true;
                    console.log("Message are not sent by same user");
                    break;
                }
            }
        }

        if(!error){
            this.messages = { chat: message1 };

            for(let i = message1.length; i < message2.length; i++){
                this.messages.chat.push(message2[i]);
            }

            if(this.messages.chat != message1){
                await this.client.db.setJSON(this.privateKey, this.topic, this.messages);
            }
        }

        this.loadMessage = false;
        return this.messages;
    }

    async sendMessage(msg){
        
        if(this.loadMessage == true){
            return false;
        }

        if(!this.messages){
            this.messages = { chat: []}
        }

        this.messages.chat[this.messages.chat.length] = {
            msg: msg,
            from: this.from,
            to: this.to,
        };


        try{
        await this.client.db.setJSON(this.privateKey, this.topic, this.messages);
        }catch(error){
            console.log(error);
        }

        return this.messages;
    }

    async getMessage(topic, publicKey = this.publicKey){
        const { data, revision } = await this.client.db.getJSON(encodeURI(publicKey), topic);

        return data;
    }

    async loadUser1Messages () {
        let data = await this.getMessage(this.topic);
        if(!data){
            data = {
                chat: []
            }
        }
        return data.chat;
    }

    async loadUser2Messages () {
        let data = await this.getMessage(this.topic, this.publicKey2);
        if(!data){
            data = {
                chat: []
            }
        }
        return data.chat;
    }

    getMessages() {
        if(!this.messages){
            this.messages = {
                chat: []
            }
        }
        return this.messages;
    }

}