import { AsyncStorage } from "react-native";
import * as t from "./actionTypes";

let initialState = { isSignIn: false, user: null };

let initialFormState = {
  email: "",
  password: "",
  isLoading: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SIGN_IN:
      const user = action.data;
      AsyncStorage.multiSet([["user", JSON.stringify(user)]]);
      return { ...state, isSignIn: true, user: user };

    case t.SIGN_OUT:
      let keys = ["user"];
      AsyncStorage.multiRemove(keys);
      return { ...state, isSignIn: false, user: null };

    default:
      return state;
  }
};

export const authFormReducer = (state = initialFormState, action) => {
  switch (action.type) {
    case t.ON_CHANGE_SIGNIN:
      return { ...state, [action.payload.props]: action.payload.value };
    case t.RESET_AUTH_FORM:
      return initialFormState;
    default:
      return state;
  }
};
