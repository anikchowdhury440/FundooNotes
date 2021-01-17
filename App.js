import React, { Component } from 'react';
import {AppState} from 'react-native';
import ApplicationStack from './src/navigation/ApplicationStack';
import {Provider} from 'react-redux'
import store from './src/redux/store'
import Notification from './services/Notification';
import PushNotification from "react-native-push-notification";
import BackgroundJob from 'react-native-background-job';

const backgroundJob = {
  jobKey: 'PushLotification',
  job: () => setInterval(() => {
        Notification.reminderNotification()
      }, 5000)
};

BackgroundJob.register(backgroundJob);

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount = async () => {
    Notification.checkPermission()
    AppState.addEventListener("change", this.handleAppStateChange);
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        alert(notification.title + '\n' + notification.message)
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
  }

  backgroundSchedule = {
    jobKey : 'PushLotification'
  }
  
  handleAppStateChange = async nextAppState => {
    await this.setState({ appState: nextAppState });
    if (this.state.appState == 'background' ) {
      console.log("app is in background");
      BackgroundJob.schedule(this.backgroundSchedule)
        .then(() => {
          console.log('schedule task')
          setInterval(() => {
            Notification.reminderNotification()
          }, 5000)
        })
        .catch(error => console.log(error))
    }
    else  {
      console.log("App is in foreground");
      setInterval(() => {
        Notification.reminderNotification()
      }, 5000);
    }

  };

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
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
