import React, { Component } from 'react';
import ApplicationStack from './src/navigation/ApplicationStack';
import {Provider} from 'react-redux'
import store from './src/redux/store'

class App extends Component{
  render() {
    return (
      <Provider store = {store}>
        <ApplicationStack/>
      </Provider>
    );
  }
};

export default App;
