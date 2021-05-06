import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import { BUYER, SELLER } from "../constants";

export class Chat{


    constructor(user1privateKey, user1publicKey ,  user2PublicKey,  topic , from, type){
        this.client = new SkynetClient("https://skyportal.xyz");


        this.publicKey = user1publicKey;
        this.privateKey = user1privateKey;

        this.publicKey2 = user2PublicKey;

        this.from = from;
        this.to = type;
        this.topic = topic+'';
    }

    async loadMessages(){
        this.loadMessage = true;
        let error = false;
        this.messages = {chat: []};
        let message1 = await this.loadUser1Messages();
        let message2 = await this.loadUser2Messages();
        console.log("m1", message1);
        console.log("m2", message2);

        let min_let = Math.min(message1.length, message2.length);

        // check if old messages are not altered
        for(let i = 0; i < min_let; i++){
            if(JSON.stringify(message1[i]) != JSON.stringify(message2[i])){
                error = true;
                break;
            }
        }

        // check if new messages are only from user 2
        if(message1.length < message2.length){
            for(let i = message1.length; i < message2.length; i++){
                if(message2[i].from != this.to || message2[i].to != this.from){
                    error = true;
                    break;
                }
            }
        }

        if(!error){
            this.messages = { chat: message1 };

            for(let i = message1.length; i < message2.length; i++){
                this.messages.chat.push(message2[i]);
            }

            console.log("here we get 00 ", this.messages);

            if(this.messages.chat != message1){
                await this.client.db.setJSON(this.privateKey, this.topic, this.messages);
            }
        }

        console.log("here we get", this.messages);

        this.loadMessage = false;
        return this.messages;
    }

    async sendMessage(msg){
        
        if(this.loadMessage == true){
            return false;
        }
        console.log("before", this.messages);

        if(!this.messages){
            this.messages = { chat: []}
        }

        this.messages.chat[this.messages.chat.length] = {
            msg: msg,
            from: this.from,
            to: this.to,
        };

        console.log("before Save", this.messages);

        try{
        await this.client.db.setJSON(this.privateKey, this.topic, this.messages);
        }catch(error){
            console.log(error);
        }

        return this.messages;
    }

    async getMessage(topic, publicKey = this.publicKey){
        const { data, revision } = await this.client.db.getJSON(publicKey, topic);

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