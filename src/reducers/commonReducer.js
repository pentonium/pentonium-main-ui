import {FETCH_PARENT_CATEGORIES, FETCH_CUSTOMER_DATA ,
 WALLET_CONNECT_REQUEST, WALLET_CONNECT_SUCCESS, WALLET_CONNECT_ERROR,
 ACCOUNT_CONNECTION} from '../constants';

const initialState = {
  web3: null,
  contract: null,
  accountConnection: null,
  account: null,
  loading: false,
  error: false
};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_PARENT_CATEGORIES:
      return {
        ...state,
        "parentCategories":
          Object.keys(action.payload).map((value,key) => {
              return {
                "name":value,
                "id":action.payload[value].id
              }
          })
      }
    case FETCH_CUSTOMER_DATA:
      return{
        ...state,
        "customerData":action.customerData.filter((data) => {
          return data.id === action.customerId
        })[0],
        "jobData":action.jobsData.filter((data) => {
          return data.customerId == action.customerId
        })
    }
    case WALLET_CONNECT_REQUEST:
      return {
        ...state,
        web3: null,
        contract: null,
        account: null,
        loading: true
      }
    case WALLET_CONNECT_SUCCESS:
      return {
        ...state,
        web3: action.web3,
        contract: action.contract,
        loading: false
      }
    case WALLET_CONNECT_ERROR:
      return {
        ...state,
        web3: null,
        contract: null,
        account: null,
        loading: false,
        error: true
      } 
    case ACCOUNT_CONNECTION:
      alert("called");
      return {
        ...state,
        accountConnection: action.accountConnection,
        contract: action.contract,
        account: action.account,
      }
    default:
      return state;
  }
}
