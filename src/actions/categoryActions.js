import {FETCH_CATEGORIES, FETCH_FEATURED_JOBS , FETCH_HIGHRATED_JOBS , FETCH_NEW_JOBS , FETCH_JOB_DATA, FETCH_HASH_JOB_DATA, FETCH_JOBS_BY_CATEGORY , FETCH_ACTIVE_BUYER_JOBS , CATEGORY_CU_REQUEST , CATEGORY_CU_SUCCESS , CATEGORY_CU_ERROR} from '../constants';

import ipfs from '../ipfs';

export const fetchCategories = (id) => ({
    type:FETCH_CATEGORIES,
    categoryId:id,
    // payload:JSON.parse(JSON.stringify(jsonData))
});

export const fetchFeaturedJobs = () => ({
    type:FETCH_FEATURED_JOBS,
    // payload:JSON.parse(JSON.stringify(jobsData))
});

export const fetchHighRatedJobs = () => ({
    type:FETCH_HIGHRATED_JOBS,
    // payload:JSON.parse(JSON.stringify(jobsData))
});

export const fetchNewJobs = () => ({
    type:FETCH_NEW_JOBS,
    // payload:JSON.parse(JSON.stringify(jobsData))
});

export const fetchJobData = (id) => ({
    type:FETCH_JOB_DATA,
    jobId:id,
    // payload:JSON.parse(JSON.stringify(jobsData))
});

export const fecthJobByCategory = (id) => ({
    type:FETCH_JOBS_BY_CATEGORY,
    categoryId:id,
    // payload:JSON.parse(JSON.stringify(jobsData))
})

export function fetchData(id){
    return new Promise((resolve, reject) => {
        
        ipfs.files.get(id , (error , result) => {
            if(error){
                resolve(null)
            }else{
                resolve(JSON.parse(result[0].content.toString()));
            }
        });

    });
}




export const fetchActiveJobs = (id , flag) => ({
    type:FETCH_ACTIVE_BUYER_JOBS,
    userId:id,
    flag:flag,
})

export const createNewCategory = (name, addr, contract) => async dispatch => {
    dispatch({type: CATEGORY_CU_REQUEST});
    try{
        let id = await contract.methods.create(name).send({from: addr});
        dispatch({type: CATEGORY_CU_SUCCESS, id: id, category: name});
    }catch(e){
        console.log(e);
        dispatch({type: CATEGORY_CU_ERROR});
    }
}



