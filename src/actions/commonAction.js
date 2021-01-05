import {FETCH_PARENT_CATEGORIES, WALLET_CONNECT_REQUEST, WALLET_CONNECT_SUCCESS, WALLET_CONNECT_ERROR, FETCH_CUSTOMER_DATA} from '../constants';
import jsonData from '../data/category.json';
import jobsData from '../data/jobsData.json';
import customerData from '../data/customerData.json';

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

export const fetchCustomerData = (id) => ({
    type:FETCH_CUSTOMER_DATA,
    customerId:id,
    customerData:JSON.parse(JSON.stringify(customerData)),
    jobsData:JSON.parse(JSON.stringify(jobsData))
})