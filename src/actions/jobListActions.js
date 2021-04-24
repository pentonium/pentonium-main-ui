import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR , ALL_JOB_LIST_REQUEST , ALL_JOB_LIST_SUCCESS , ALL_JOB_LIST_ERROR} from '../constants';
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
        dispatch({type: JOB_LIST_SUCCESS, list: filteredCategory , start:start , end:end});
    }catch(e){
        dispatch({type: JOB_LIST_ERROR});
    }
}

export const getAllCategoryJobs = (account , web3 , contractList) => async dispatch => {
    dispatch({type:ALL_JOB_LIST_REQUEST});
    console.log(contractList);
    try{
        let list = [];
        contractList.map(async (contract , i) => {
            let ocontract = new web3.eth.Contract(OFFER_CONTRACT_ABI, contract);
            let category = await ocontract.methods.category().call();
            let start = await ocontract.methods.start().call();
            let categories = await ocontract.methods.read(start , 10 ).call();
            list = [...list , {'name':category , list:categories.filter((cat) =>{ return cat.ipfs_hash != ""}) , offerContract:contract}];
            if(list.length == contractList.length){
                dispatch({type:ALL_JOB_LIST_SUCCESS,list:list});
            }
        });
    }catch(e){
        dispatch({type:ALL_JOB_LIST_ERROR});
    }
}
