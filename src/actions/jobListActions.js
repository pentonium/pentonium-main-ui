import {JOB_LIST_REQUEST , JOB_LIST_SUCCESS , JOB_LIST_ERROR} from '../constants';


/**
 * get list of categories
 * @param {contract object} contract
 */
export const getJobsList = (contract , account) => async dispatch => {
    dispatch({type: JOB_LIST_REQUEST});
    console.log('Job List' , contract , account);
    try{
        let categories = await contract.methods.read(10 , 10 ).call();

        dispatch({type: JOB_LIST_SUCCESS, list: categories});
    }catch(e){
        console.log(e);
        dispatch({type: JOB_LIST_ERROR});
    }
}