

import React, { Component} from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import RootNavigator from "./src/RootNavigator";
import reducers from "./src/reducers";

export default class App extends Component {

  render() {

    return (

      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
        <RootNavigator />
      </Provider>
    );

  }

}


AppRegistry.registerComponent('BestOrBetter', () => App);
