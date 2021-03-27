import {POST_JOB_REQUEST , POST_JOB_SUCCESS , POST_JOB_ERROR , POST_UPDATE_JOB_REQUEST , POST_UPDATE_JOB_SUCCESS , POST_UPDATE_JOB_ERROR , DELETE_JOB_REQUEST ,DELETE_JOB_SUCCESS ,  DELETE_JOB_ERROR} from '../constants';


/**
 * get list of categories
 * @param {contract object} contract
 */
export const postJob = (contract , hash , thumbnail , provider , account) => async dispatch => {
    dispatch({type: POST_JOB_REQUEST});
    try{
        await contract.methods.create(hash , thumbnail , provider,0).send({from:account});

        dispatch({type: POST_JOB_SUCCESS});
    }catch(e){
        console.log(e);
        dispatch({type: POST_JOB_ERROR});
    }
}

export const updateJob = (contract , hash , thumbnail , provider , id) => async dispatch => {
    dispatch({type: POST_UPDATE_JOB_REQUEST});
    try{
        await contract.methods.update(hash, thumbnail , provider , 0 , id)
        dispatch({type: POST_UPDATE_JOB_SUCCESS});
    }catch(e){
        dispatch({type: POST_UPDATE_JOB_ERROR});
    }
}

export const deleteJob = (contract , account , id) => async dispatch => {
    dispatch({type: DELETE_JOB_REQUEST});
    try{
        await contract.methods.deleteGig(id).send({from:account})
        dispatch({type: DELETE_JOB_SUCCESS});
    }catch(e){
        dispatch({type: DELETE_JOB_ERROR});
    }
}