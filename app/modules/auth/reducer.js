import * as t from "./actionTypes";

let InitialState = {
  isSignIn: false,
  uid: "",
  username: "",
  email: "",
  role: "",
  token: null
};

let InitialFormState = {
  email: "",
  password: "",
  isLoading: false
};

let InitialPasswordFormState = {
  currPassword: "",
  newPassword: "",
  confPassword: ""
};

export const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case t.SIGN_IN:
      const { uid, name, email, role } = action.payload;
      return { ...state, isSignIn: true, uid, username: name, email, role };
    case t.REGISTER_PUSH_NOTIFICATION:
      const { token } = action.payload;
      return { ...state, token };
    case t.SIGN_OUT:
      return InitialState;
    default:
      return state;
  }
};

export const authFormReducer = (state = InitialFormState, action) => {
  switch (action.type) {
    case t.ON_CHANGE_SIGNIN_FORM:
      return { ...state, [action.payload.props]: action.payload.value };
    case t.RESET_AUTH_FORM:
    case t.SIGN_OUT:
      return InitialFormState;
    default:
      return state;
  }
};

export const passwordFormReducer = (
  state = InitialPasswordFormState,
  action
) => {
  switch (action.type) {
    case t.ON_CHANGE_PASSWORD_FORM:
      return { ...state, [action.payload.props]: action.payload.value };
    case t.SIGN_OUT:
      return InitialPasswordFormState;
    default:
      return state;
  }
};
