import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import categoryReducer from "./categoryReducer";


const rootReducer = combineReducers({
  common: commonReducer,
  category:categoryReducer
});

export default rootReducer;
