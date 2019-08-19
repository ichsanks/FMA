import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import Routes from "./Routes";

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navReducer
);

const AppWithNavigationState = reduxifyNavigator(Routes, "root");

const mapStateToProps = state => {
  return {
    state: state.navReducer
  };
};

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { AppNavigator, navMiddleware };
