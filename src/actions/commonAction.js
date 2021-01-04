import {FETCH_PARENT_CATEGORIES, WALLET_CONNECT_REQUEST, WALLET_CONNECT_SUCCESS, WALLET_CONNECT_ERROR} from '../constants';
import jsonData from '../data/category.json';

export const fetchParentCategories = () => ({
    type:FETCH_PARENT_CATEGORIES,
    payload:JSON.parse(JSON.stringify(jsonData))
})

export const requestConnection = () => ({
    type:WALLET_CONNECT_REQUEST,
    payload:'request_Connection'
})

export const connectionSuccess = () => ({
    type:WALLET_CONNECT_SUCCESS,
    payload:'connection_success'
})

export const connectionFailure = () => ({
    type:WALLET_CONNECT_ERROR,
    payload:'connection_error'
})