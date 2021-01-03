import {FETCH_CATEGORIES, FETCH_FEATURED_JOBS , FETCH_HIGHRATED_JOBS , FETCH_NEW_JOBS} from '../constants';
import jobsData from '../data/jobsData.json';
import jsonData from '../data/category.json';

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