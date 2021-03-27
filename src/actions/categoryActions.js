import {FETCH_CATEGORIES, FETCH_FEATURED_JOBS , FETCH_HIGHRATED_JOBS , FETCH_NEW_JOBS , FETCH_JOB_DATA, FETCH_HASH_JOB_DATA, FETCH_JOBS_BY_CATEGORY , FETCH_ACTIVE_BUYER_JOBS} from '../constants';
import jobsData from '../data/jobsData.json';
import jsonData from '../data/category.json';
import ipfs from '../ipfs';

export const fetchCategories = (id) => ({
    type:FETCH_CATEGORIES,
    categoryId:id,
    payload:JSON.parse(JSON.stringify(jsonData))
});

export const fetchFeaturedJobs = () => ({
    type:FETCH_FEATURED_JOBS,
    payload:JSON.parse(JSON.stringify(jobsData))
});

export const fetchHighRatedJobs = () => ({
    type:FETCH_HIGHRATED_JOBS,
    payload:JSON.parse(JSON.stringify(jobsData))
});

export const fetchNewJobs = () => ({
    type:FETCH_NEW_JOBS,
    payload:JSON.parse(JSON.stringify(jobsData))
});

export const fetchJobData = (id) => ({
    type:FETCH_JOB_DATA,
    jobId:id,
    payload:JSON.parse(JSON.stringify(jobsData))
});

export const fecthJobByCategory = (id) => ({
    type:FETCH_JOBS_BY_CATEGORY,
    categoryId:id,
    payload:JSON.parse(JSON.stringify(jobsData))
})

export function fetchData(id){
    return  function (dispatch) {
      return ipfs.files.get(id , (error , result) => {
        dispatch({
            type:FETCH_HASH_JOB_DATA,
            payload:JSON.parse(result[0].content.toString())
        });
      });
    };
}

// export const getCategories = (contract) => async dispatch => {
//     dispatch({type: JOB_LIST_REQUEST});
//     try{
//         let categories = await contract.methods.getPaymentTypesCategories().call();

//         dispatch({type: JOB_LIST_SUCCESS, list: categories});
//     }catch(e){
//         dispatch({type: JOB_LIST_ERROR});
//     }
// }


export const fetchActiveJobs = (id , flag) => ({
    type:FETCH_ACTIVE_BUYER_JOBS,
    userId:id,
    flag:flag,
    payload:JSON.parse(JSON.stringify(jobsData))
})

// export const updateCategory = (id, name, account, contract) => async dispatch => {
//     dispatch({type: CATEGORY_CU_REQUEST});
//     try{
//         await contract.methods.updatePaymentTypeCategory(id, name).send({from: account});

//         dispatch({type: CATEGORY_CU_SUCCESS, id: id, category: name});
//     }catch(e){
//         console.log(e);
//         dispatch({type: CATEGORY_CU_ERROR});
//     }
// }

/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 */

// import { 
//     CATEGORY_LIST_REQUEST, CATEGORY_LIST_ERROR, CATEGORY_LIST_SUCCESS,
//     CATEGORY_CU_REQUEST, CATEGORY_CU_ERROR, CATEGORY_CU_SUCCESS,
//     CATEGORY_SINGLE_REQUEST, CATEGORY_SINGLE_SUCCESS, CATEGORY_SINGLE_ERROR,
//     CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_ERROR} from "../constants";


// /**
//  * get list of categories
//  * @param {contract object} contract
//  */
// export const getCategories = (contract) => async dispatch => {
//     dispatch({type: CATEGORY_LIST_REQUEST});
//     try{
//         let categories = await contract.methods.getPaymentTypesCategories().call();

//         dispatch({type: CATEGORY_LIST_SUCCESS, list: categories});
//     }catch(e){
//         dispatch({type: CATEGORY_LIST_ERROR});
//     }
// }



// /**
//  * get single category
//  * @param {integer} id
//  * @param {contract object} contract
//  */
// export const getSingleCategory = (id, contract) => async dispatch => {
//      dispatch({type: CATEGORY_SINGLE_REQUEST});
//     try{
//         let category = await contract.methods.getCategoryById(id).call();

//         dispatch({type: CATEGORY_SINGLE_SUCCESS, id: id, category: category});
//         return category;
//     }catch(e){
//         dispatch({type: CATEGORY_SINGLE_ERROR});
//     }
// }



// /**
//  * create new category
//  * @param {string} name
//  * @param {address} addr
//  * @param {contract object} contract
//  */
// export const createNewCategory = (name, addr, contract) => async dispatch => {
//     dispatch({type: CATEGORY_CU_REQUEST});
//     try{
//         console.log(contract);
//         let id = await contract.methods.addPaymentTypeCategory(name).send({from: addr});

//         console.log(id);
//         dispatch({type: CATEGORY_CU_SUCCESS, id: id, category: name});
//     }catch(e){
//         console.log(e);
//         dispatch({type: CATEGORY_CU_ERROR});
//     }
// }



// /**
//  * update an existing category
//  * @param {integer} id
//  * @param {string} name
//  * @param {address} addr
//  * @param {contract object} contract
//  */
// export const updateCategory = (id, name, account, contract) => async dispatch => {
//     dispatch({type: CATEGORY_CU_REQUEST});
//     try{
//         await contract.methods.updatePaymentTypeCategory(id, name).send({from: account});

//         dispatch({type: CATEGORY_CU_SUCCESS, id: id, category: name});
//     }catch(e){
//         console.log(e);
//         dispatch({type: CATEGORY_CU_ERROR});
//     }
// }




// /**
//  * delete an existing category
//  * @param {integer} id
//  * @param {address} addr
//  * @param {contract object} contract
//  */
// export const deleteCategory = (id, account, contract) => async dispatch => {
//     dispatch({type: CATEGORY_DELETE_REQUEST});
//     try{
        
//         await contract.methods.deletePaymentTypeCategory(id).send({from: account});

//         dispatch({type: CATEGORY_DELETE_SUCCESS });
//     }catch(e){
//         dispatch({type: CATEGORY_DELETE_ERROR});
//     }
// }

