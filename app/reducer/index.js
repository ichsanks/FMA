import { combineReducers } from "redux";
import { authReducer, authFormReducer } from "../modules/auth/reducer";
import { assetReducer, assetFormReducer } from "../modules/assets/reducer";
import navReducer from "../navigations/reducer";

export default combineReducers({
  authReducer,
  authFormReducer,
  assetReducer,
  assetFormReducer,
  userReducer,
  userFormReducer,
  scannerReducer,
  navReducer
});
