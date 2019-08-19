import * as t from "./actionTypes";
import { SIGN_OUT } from "../auth/actionTypes";

let InitialState = {
  loading: true,
  data: []
};

let InitialFormState = {
  uid: "",
  email: "",
  name: "",
  loading: false
};

export const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case t.FETCH_USERS_SUCCESS: {
      let { payload } = action;
      let data = [];

      for (let prop in payload) {
        let item = payload[prop];
        item.uid = prop;
        data.push(item);
      }

      return { ...state, data, loading: false };
    }
    case SIGN_OUT:
      return InitialState;
    default:
      return state;
  }
};

export const userFormReducer = (state = InitialFormState, action) => {
  switch (action.type) {
    case t.FETCH_CURRENT_USER_SUCCESS:
      const { uid, email, name } = action.payload;
      return { ...state, uid, email, name };
    case t.ON_CHANGE_USER_FORM:
      return { ...state, [action.payload.props]: action.payload.value };
    case t.ADD_USER:
      return { ...state, loading: true };
    case t.RESET_USER_FORM:
    case SIGN_OUT:
      return InitialFormState;
    default:
      return state;
  }
};
