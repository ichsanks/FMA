import * as t from "./actionTypes";
import { SIGN_OUT } from "../auth/actionTypes";

let InitialState = {
  isScanning: false,
  message: ""
};

export const scannerReducer = (state = InitialState, action) => {
  switch (action.type) {
    case t.CHANGE_SCAN_STATE:
      return { ...state, isScanning: action.payload };
    case t.CHANGE_MESSAGE:
      return { ...state, message: action.payload };
    case SIGN_OUT:
      return InitialState;
    default:
      return state;
  }
};
