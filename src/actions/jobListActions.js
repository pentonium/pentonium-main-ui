import { OFFER_CONTRACT_ABI } from '../config/abi/offerContract';
import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR , ALL_JOB_LIST_REQUEST , ALL_JOB_LIST_SUCCESS , ALL_JOB_LIST_ERROR} from '../constants';


/**
 * get list of categories
 * @param {contract object} contract
 */
export const getJobsList = (contract , account , web3 , offerContract, _start, jlist) => async dispatch => {
    dispatch({type: JOB_LIST_REQUEST});
    try{
        let filteredCategory = [];
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offerContract);
        let iStart = _start;
        let start = await contract.methods.start().call();
        if(!iStart){
            iStart = start;
        }
        let end = await contract.methods.end().call();
        let category_name = await contract.methods.category().call();
        let categories = await contract.methods.read(iStart , 12).call();
        filteredCategory = categories.filter((cat) =>{ return cat.ipfs_hash != ""});
        let conArray = jlist.concat(filteredCategory);

        dispatch({type: JOB_LIST_SUCCESS, list:  conArray , start:start , end:end, name: category_name});
    }catch(e){
        dispatch({type: JOB_LIST_ERROR});
    }
}

export const getAllCategoryJobs = (account , web3 , contractList) => async dispatch => {
    dispatch({type:ALL_JOB_LIST_REQUEST});
    console.log(contractList);
    try{
        let list = [];
        for(let i = 0; i<contractList.length; i++){

            let ocontract = new web3.eth.Contract(OFFER_CONTRACT_ABI, contractList[i]);
            let category = await ocontract.methods.category().call();
            let start = await ocontract.methods.start().call();
            let categories = await ocontract.methods.read(start , 10 ).call();
            list = [...list , {'name':category , list:categories.filter((cat) =>{ return cat.ipfs_hash != ""}) , offerContract:contractList[i]}];

        }
        dispatch({type:ALL_JOB_LIST_SUCCESS,list:list});
    }catch(e){
        dispatch({type:ALL_JOB_LIST_ERROR});
    }
}
