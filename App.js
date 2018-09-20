import React, { Component } from "react";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "./app/reducer";
import { AppNavigator, navMiddleware } from "./app/navigations/AppNavigator";

class App extends Component {
  logger({ getState }) {
    return next => action => {
      console.log("dispatching", action);
      let val = next(action);
      console.log("state", getState());
      return val;
    };
  }

  render() {
    const store = createStore(
      reducer,
      compose(applyMiddleware(thunk, navMiddleware, logger))
    );
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;