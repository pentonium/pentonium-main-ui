import {FETCH_PARENT_CATEGORIES, WALLET_CONNECT_REQUEST, WALLET_CONNECT_SUCCESS, WALLET_CONNECT_ERROR, FETCH_CUSTOMER_DATA} from '../constants';
import jsonData from '../data/category.json';
import jobsData from '../data/jobsData.json';
import customerData from '../data/customerData.json';
import Web3 from "web3";
import { CONTRACT_ADDRESS , CONTRACT_ABI , CATEGORY_CONTRACT_ADDRESS } from "../config";
import { CATEGORY_CONTRACT_ABI } from '../config/abi/categoryContract';

export const fetchParentCategories = () => ({
    type:FETCH_PARENT_CATEGORIES,
    payload:JSON.parse(JSON.stringify(jsonData))
})

// export const requestConnection = () => ({
//     type:WALLET_CONNECT_REQUEST,
//     payload:'request_Connection'
// })

// export const connectionSuccess = () => ({
//     type:WALLET_CONNECT_SUCCESS,
//     payload:'connection_success'
// })

// export const connectionFailure = () => ({
//     type:WALLET_CONNECT_ERROR,
//     payload:'connection_error'
// })

export const fetchCustomerData = (id) => ({
    type:FETCH_CUSTOMER_DATA,
    customerId:id,
    customerData:JSON.parse(JSON.stringify(customerData)),
    jobsData:JSON.parse(JSON.stringify(jobsData))
})

/**
 * connect wallet
 * takes out account
 * initialize liberty pie core contract with abi
 * initialize permission manager contract
 */
export const connectWallet = () => async dispatch =>  {

    dispatch({type: WALLET_CONNECT_REQUEST});

    if (window.ethereum) {

        const web3 = new Web3(window.ethereum);


        try {
            var chainId = parseInt(window.ethereum.chainId, 16);
            if(chainId != 3){
                throw Error;
            }
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
          
            let data = await initialize(web3);
          
            hookInWalletChange();
            dispatch({type: WALLET_CONNECT_SUCCESS, ...data});
        } catch (error) {
            dispatch({type: WALLET_CONNECT_ERROR});
            console.error(error);
        }
    }else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
  
        let data = await initialize(web3);

        hookInWalletChange();
        dispatch({type: WALLET_CONNECT_SUCCESS, ...data});
    }else {
        dispatch({type: WALLET_CONNECT_ERROR});
    }
}




/**
 * connect if authorize
 * takes out account
 * initialize liberty pie core contract with abi
 * initialize permission manager contract
 */
export const connectIfAuthorized = () => async dispatch =>  {
    
    if (window.ethereum) {
        try{
            const web3 = new Web3(window.ethereum);

            let data = await initialize(web3);


            hookInWalletChange();
            dispatch({type: WALLET_CONNECT_SUCCESS, ...data});
            
        }catch (error) {
        }
    }
}




/**
 * Private Function
 * hinitialize contract, account & permission manager
 * @param {web3 obbject} web3
 */
async function initialize(web3){

    var accounts = await web3.eth.getAccounts();

    if(accounts.length > 0){
        var firstAcc = accounts[0];

        let contract = new web3.eth.Contract(CATEGORY_CONTRACT_ABI, CATEGORY_CONTRACT_ADDRESS);

        return({web3: web3, contract: contract, account: firstAcc});
    }
}


/**
 * Private Function
 * hook with account change and network change
 */
function hookInWalletChange(){
    window.ethereum.on('accountsChanged', function (accounts) {
        window.location.href = window.location.href;
    })
    
    window.ethereum.on('networkChanged', function (networkId) {
        window.location.href = window.location.href;
    })
}