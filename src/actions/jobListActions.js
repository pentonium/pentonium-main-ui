import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR} from '../constants';
import { OFFER_CONTRACT_ABI } from "../config";


/**
 * get list of categories
 * @param {contract object} contract
 */
export const getJobsList = (contract , account , web3 , offerContract) => async dispatch => {
    dispatch({type: JOB_LIST_REQUEST});
    try{
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offerContract);
        let categories = await contract.methods.read(1 , 50 ).call();

        dispatch({type: JOB_LIST_SUCCESS, list: categories});
    }catch(e){
        dispatch({type: JOB_LIST_ERROR});
    }
}