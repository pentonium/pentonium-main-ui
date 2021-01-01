import {FETCH_CATEGORIES} from '../constants';
import jsonData from '../data/category.json';

export const fetchCategories = (id) => ({
    type:FETCH_CATEGORIES,
    categoryId:id,
    payload:JSON.parse(JSON.stringify(jsonData))
})