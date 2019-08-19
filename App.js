import React, { Component } from "react";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./app/reducer";
import { AppNavigator, navMiddleware } from "./app/navigations/AppNavigator";

class App extends Component {
  render() {
    const store = createStore(
      reducer,
      compose(applyMiddleware(thunk, navMiddleware))
    );

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
