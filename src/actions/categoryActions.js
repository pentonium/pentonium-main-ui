import {FETCH_CATEGORIES, FETCH_FEATURED_JOBS , FETCH_HIGHRATED_JOBS , FETCH_NEW_JOBS , FETCH_JOB_DATA, FETCH_HASH_JOB_DATA, FETCH_JOBS_BY_CATEGORY} from '../constants';
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

