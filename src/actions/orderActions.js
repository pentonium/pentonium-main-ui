import { genKeyPairFromSeed } from 'skynet-js';
import { ORDER_CONTRACT_ABI } from '../config/abi/orderContract';
import {CLIENT_LIST_REQUEST , CLIENT_LIST_SUCCESS , CLIENT_LIST_ERROR, ORDER_ACCEPTED, ORDER_REJECTED, ORDER_MESSAGES, ORDER_CANCELLED} from '../constants';
import { fetchData } from './categoryActions';


function makeRandomId(length){
        var result = [];
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
          );
        }
        return result.join("");
}

async function fetchDataFromHash(contract){
    let ipfs_hash = await contract.methods.ipfs_hash().call();
    let status = await contract.methods.order_status().call();
    let data = await fetchData(ipfs_hash);
    let statusMessage = ORDER_MESSAGES[status];
    return {data:data , status:statusMessage}
}

export const getOrderDetail =  async (web3 , account , orderContract) =>  {
    let contract = new web3.eth.Contract(ORDER_CONTRACT_ABI , orderContract);
    // console.log('Contract' , contract);
    return await fetchDataFromHash(contract);
}

export const updateOrderStatus =  async (web3 , account ,orderContract , status) =>  {
    let contract = new web3.eth.Contract(ORDER_CONTRACT_ABI , orderContract);
    try{
        if(status === ORDER_ACCEPTED){
            const serviceProvider = makeRandomId(200);
            let { publicKey, privateKey } = genKeyPairFromSeed(serviceProvider);
            await contract.methods.acceptOrder(publicKey , privateKey).send({from:account});
        }else if (status === ORDER_REJECTED){
            await contract.methods.rejectOrder()
        } else if (status === ORDER_CANCELLED){
            await contract.methods.cancelOrder();
        }
        return await fetchDataFromHash(contract)
    } catch(e){
        console.log(e);
    }
}