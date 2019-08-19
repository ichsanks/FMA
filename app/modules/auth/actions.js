import { AsyncStorage } from "react-native";
import * as t from "./actionTypes";
import * as api from "./api";
import { cameraAccess, registerPushNotification } from "../../services";
import {
  FETCH_LOCATIONS_SUCCESS,
  FETCH_ASSETS_SUCCESS
} from "../assets/actionTypes";
import { fetchAssets, fetchLocations } from "../assets/api";
import { NavigationActions } from "react-navigation";

export const onChangeSignInForm = ({ props, value }) => {
  return {
    type: t.ON_CHANGE_SIGNIN_FORM,
    payload: { props, value }
  };
};

export const onChangePasswordForm = ({ props, value }) => {
  return {
    type: t.ON_CHANGE_PASSWORD_FORM,
    payload: { props, value }
  };
};

export const initialize = () => {
  return dispatch => {
    cameraAccess()
      .then(() => {
        registerPushNotification().then(token => {
          dispatch({ type: t.REGISTER_PUSH_NOTIFICATION, payload: { token } });
          AsyncStorage.getItem("auth")
            .then(userdata => {
              if (userdata) {
                fetchLocations((success, data, error) => {
                  if (success)
                    dispatch({ type: FETCH_LOCATIONS_SUCCESS, payload: data });
                });
                fetchAssets(null, (success, data, error) => {
                  if (success) {
                    dispatch({
                      type: FETCH_ASSETS_SUCCESS,
                      payload: data
                    });
                    const routeName =
                      JSON.parse(userdata).role === "admin"
                        ? "AdminRoute"
                        : "UserRoute";
                    dispatch({
                      type: t.SIGN_IN,
                      payload: JSON.parse(userdata)
                    });
                    dispatch(NavigationActions.navigate({ routeName }));
                  }
                });
              } else {
                dispatch(
                  NavigationActions.navigate({ routeName: "AuthRoutes" })
                );
              }
            })
            .catch(error => alert(error));
        });
      })
      .catch(error => alert(error));
  };
};

export const signIn = logindata => {
  return dispatch => {
    api.isLogged(logindata.email, (success, login, error) => {
      if (success) {
        if (!login) {
          api.signIn(logindata, (success, data, error) => {
            const userdata = JSON.stringify(data);
            if (success) {
              AsyncStorage.setItem("auth", userdata)
                .then(() => {
                  fetchLocations((success, data, error) => {
                    if (success)
                      dispatch({
                        type: FETCH_LOCATIONS_SUCCESS,
                        payload: data
                      });
                  });
                  fetchAssets(null, (success, data, error) => {
                    if (success) {
                      dispatch({
                        type: FETCH_ASSETS_SUCCESS,
                        payload: data
                      });
                      const routeName =
                        JSON.parse(userdata).role === "admin"
                          ? "AdminRoute"
                          : "UserRoute";
                      dispatch({
                        type: t.SIGN_IN,
                        payload: JSON.parse(userdata)
                      });
                      dispatch(NavigationActions.navigate({ routeName }));
                    }
                  });
                })
                .catch(error => alert(error));
            } else if (error) alert(error);
          });
        } else
          alert("This account has been used in another device. Please logout");
      } else if (error) alert(error);
    });
  };
};

export const signOut = uid => {
  return dispatch => {
    api.signOut(uid, (success, error) => {
      if (success) {
        AsyncStorage.clear();
        dispatch({ type: t.SIGN_OUT });
        dispatch(NavigationActions.navigate({ routeName: "Splash" }));
      } else if (error) alert(error);
    });
  };
};

export const updatePassword = pass => {
  return dispatch => {
    api.validatePassword(pass, (success, error) => {
      if (success) {
        api.updatePassword(pass, (success, error) => {
          if (success) {
            dispatch({ type: t.RESET_PASSWORD_FORM });
            dispatch(NavigationActions.navigate({ routeName: "Settings" }));
          } else if (error) alert(error);
        });
      } else if (error) alert(error);
    });
  };
};
