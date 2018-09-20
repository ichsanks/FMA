import { AsyncStorage } from "react-native";
import * as t from "./actionTypes";
import * as api from "./api";
import { fetchAssets } from "../assets/api";
import { NavigationActions } from "react-navigation";

export const onChangeSignIn = ({ props, value }) => {
  return {
    type: t.ON_CHANGE_SIGNIN,
    payload: { props, value }
  };
};

const requestCamera = () => {
  return dispatch => {
    api.requestCamera();
  };
};

const requestNotification = () => {
  return dispatch => {
    api.requestNotification(data).then(data => {
      dispatch({ type: t.ASSIGN_NOTIFICATON_TOKEN, payload: data });
    });
  };
};

const fetchLocations = callback => {
  return dispatch => {};
};

export const initialize = () => {
  return dispatch => {
    fetchAssets();
  };
};

/* export const signIn = (data, successCB, errorCB) => {
  return dispatch => {
    api.signIn(data, (success, data, error) => {
      if (success) {
        AsyncStorage.setItem("user", data).then(() =>
          dispatch(NavigationActions.navigate({ routeName: "AssetList" }))
        );
      } else {
        alert(error);
      }
    });
  };
};

export const signOut = (successCB, errorCB) => {
  return dispatch => {
    api.signOut((success, data, error) => {
      if (success) {
        dispatch({ type: t.SIGN_OUT });
        successCB();
      } else if (error) {
        errorCB(error);
      }
    });
  };
};

export const checkLoginStatus = callback => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      let isSignIn = user != null;

      if (isSignIn) {
        api.getUser(user, (success, { exists, user }, error) => {
          if (success) {
            if (exists) {
              dispatch({ type: t.SIGN_IN, data: user });
              callback(exists, isSignIn);
            } else if (error) {
              dispatch({ type: t.SIGN_OUT });
              callback(false, false);
            }
          }
        });
      } else {
        dispatch({ type: t.SIGN_OUT });
        callback(false, isSignIn);
      }
    });
  };
};



export const PasswordOnChange = () => {};

export const checkLogin = errorCB => {
  return dispatch => {
    AsyncStorage.getItem("user", (error, result) => {
      if (result) {
        dispatch(NavigationActions.navigate({ routeName: "AssetList" }));
        /* api.fetchAssets(location, (success, data, error) => {
          if (success) {
            dispatch({ type: t.FETCH_ASSETS_SUCCESS, payload: data });
          } else if (error) errorCB(error);
        });
      } else {
        this.props.navigation.navigate("SignIn");
      }
    });
  };
};
 */
