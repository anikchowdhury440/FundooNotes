import React, { Component } from 'react';
import ApplicationStack from './src/navigation/ApplicationStack';
import {Provider} from 'react-redux'
import store from './src/redux/store'
import Notification from './services/Notification';
import PushNotification from "react-native-push-notification";

class App extends Component{
  componentDidMount = async () => {
    Notification.checkPermission()
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        alert(notification.data.title, notification.data.body)
      },
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    // PushNotification.localNotification({
    //   title: "My Notification Title", // (optional)
    //   message: "My Notification Message", // (required)
    // });
   Notification.reminderNotification() 
  }

  render() {
    return (
      <Provider store = {store}>
        <ApplicationStack/>
      </Provider>
    );
  }
};

export default App;
