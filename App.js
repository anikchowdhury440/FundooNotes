/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import ApplicationStack from './src/navigation/ApplicationStack';

class App extends Component{
  render() {
    return (
      <ApplicationStack/>
    );
  }
};

const styles = StyleSheet.create({
  
});

export default App;
