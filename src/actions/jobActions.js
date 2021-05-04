import { OFFER_CONTRACT_ABI } from '../config/abi/offerContract';
import {POST_JOB_REQUEST , POST_JOB_SUCCESS , POST_JOB_ERROR , POST_UPDATE_JOB_REQUEST , POST_UPDATE_JOB_SUCCESS , POST_UPDATE_JOB_ERROR , DELETE_JOB_REQUEST ,DELETE_JOB_SUCCESS ,  DELETE_JOB_ERROR , JOB_DETAIL_REQUEST , JOB_DETAIL_SUCCESS , JOB_DETAIL_ERROR , PLACE_ORDER_REQUEST , PLACE_ORDER_ERROR , PLACE_ORDER_SUCCESS} from '../constants';

/**
 * get list of categories
 * @param {contract object} contract
 */
export const postJob = (web3 , hash , thumbnail , provider , account , offerContract , price , duration) => async dispatch => {
    dispatch({type: POST_JOB_REQUEST});
    try{
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offerContract);

        await contract.methods.create(hash , thumbnail + '' , price , duration ).send({from:account});
        dispatch({type: POST_JOB_SUCCESS});
    }catch(e){
        console.log(e);
        dispatch({type: POST_JOB_ERROR});
    }
}

export const updateJob = (web3 , offerContract , hash , thumbnail , price , id , account) => async dispatch => {
    dispatch({type: POST_UPDATE_JOB_REQUEST});
    try{
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offerContract);
        await contract.methods.update(hash, thumbnail , price , id).send({from:account});
        dispatch({type: POST_UPDATE_JOB_SUCCESS});
    }catch(e){
        console.log(e)
        dispatch({type: POST_UPDATE_JOB_ERROR});
    }
}

export const deleteJob = (web3 , offercontract , account , id) => async dispatch => {
    dispatch({type: DELETE_JOB_REQUEST});
    try{
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offercontract);
        await contract.methods.deleteGig(id).send({from:account});
        dispatch({type: DELETE_JOB_SUCCESS});
    }catch(e){
        console.log(e);
        dispatch({type: DELETE_JOB_ERROR});
    }
}

export const getJobDetail = (web3 , id , offerContract) => async dispatch => {
    dispatch({type: JOB_DETAIL_REQUEST});
    try{
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offerContract);

        console.log("id", id, offerContract);

        let returnData = await contract.methods.gigs(id).call();

        console.log("job", returnData);
        dispatch({type: JOB_DETAIL_SUCCESS , detail:returnData});
    }catch(e){
        console.log('Error' , e);
        dispatch({type: JOB_DETAIL_ERROR});
    }
}

export const placeOrder = (account , web3 , id , offerContract , clientProvider , serviceProvider) => async dispatch => {
    console.log(clientProvider , serviceProvider);
    dispatch({type:PLACE_ORDER_REQUEST});
    try{
        let contract = new web3.eth.Contract(OFFER_CONTRACT_ABI, offerContract);
        await contract.methods.placeOrder(id , clientProvider , serviceProvider).send({from:account});
        dispatch({type:PLACE_ORDER_SUCCESS});

    }catch(e){
        console.log(e);
        dispatch({type:PLACE_ORDER_ERROR});
    }
}
