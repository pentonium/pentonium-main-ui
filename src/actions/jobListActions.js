import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR} from '../constants';
import { OFFER_CONTRACT_ABI } from "../config";


/**
 * get list of categories
 * @param {contract object} contract
 */
export const getJobsList = (contract , account , web3 , offerContract) => async dispatch => {
    dispatch({type: JOB_LIST_REQUEST});
    try{
        let filteredCategory = [];
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offerContract);
        let start = await contract.methods.start().call();
        let end = await contract.methods.end().call();
        let categories = await contract.methods.read(start , 10 ).call();
        filteredCategory = categories.filter((cat) =>{ return cat.ipfs_hash != ""});
        console.log('List contract' , contract);
        dispatch({type: JOB_LIST_SUCCESS, list: filteredCategory , start:start , end:end});
    }catch(e){
        dispatch({type: JOB_LIST_ERROR});
    }
}