import {CATEGORY_LIST_REQUEST , CATEGORY_LIST_SUCCESS , CATEGORY_LIST_ERROR} from '../constants';


/**
 * get list of categories
 * @param {contract object} contract
 */
export const getCategoriesList = (contract , account) => async dispatch => {
    dispatch({type: CATEGORY_LIST_REQUEST});
    try{
        let categories = await contract.methods.getAllCategpries().call();
        dispatch({type: CATEGORY_LIST_SUCCESS, list: categories});
    }catch(e){
        dispatch({type: CATEGORY_LIST_ERROR});
    }
}