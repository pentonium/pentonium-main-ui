import {FETCH_PARENT_CATEGORIES} from '../constants';
import jsonData from '../data/category.json';

// export const filterProducts = (filterKey,payload)  => ({  
//     type: FILTER_PRODUCTS,  
//     key:filterKey,
//     value:payload
// });

export const fetchParentCategories = () => ({
    type:FETCH_PARENT_CATEGORIES,
    payload:JSON.parse(JSON.stringify(jsonData))
})