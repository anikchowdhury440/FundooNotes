import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'react-native-firebase';
import SQLiteServices from './SQLiteServices';
import * as Keychain from 'react-native-keychain';
import PushNotification from "react-native-push-notification";

class Notification {
    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        console.log(enabled)
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    getToken = async() => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log(fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log(fcmToken)
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    requestPermission  = async() => {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }  

    sendPushNotification = async (title, note) => {
        const token = await AsyncStorage.getItem('fcmToken')
        const FIREBASE_API_KEY = "AAAAnO4YISk:APA91bGP_7DI3gx7OaF5VfQVZtXLsOePqc9n-edD7HzY5ttPAeih98GxBbcCNZk1KjKFGhIQsUTPgVaVvgHwmEA5PBUHbGdh2XTB3_koqgbpeJUSjkwZ1GdqhGbrOOfd_3-dSl0lZZ5G"
        const message = {
          registration_ids: [
            token
          ],
          notification: {
            title: title,
            body: note,
            vibrate: 1,
            sound: 1,
            show_in_foreground: true,
            priority: "high",
            content_available: true,
          },
          data: {
            title: title,
            body: note,
            score: 50,
            wicket: 1,
          },
        }
            
        let response = await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + FIREBASE_API_KEY,
          },
          body: JSON.stringify(message),
        })
        response = await response.json()
        console.log(response)
    }

    reminderNotification = async() => {
        const isLoggedIn = JSON.parse(await AsyncStorage.getItem('isLoggedIn'))
        let date = new Date()
        let reminder
        if(isLoggedIn) {
            const credential = await Keychain.getGenericPassword();
            const UserCredential = JSON.parse(credential.password);
            await SQLiteServices.selectNoteFromSQliteStorage(UserCredential.user.uid)
                .then(async result => {
                    if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i) {
                        if(JSON.parse(result.rows.item(i).reminder) != '') {
                            reminder = new Date(JSON.parse(result.rows.item(i).reminder))
                            if(date.getDate() == reminder.getDate() &&
                                date.getMonth() == reminder.getMonth() &&
                                date.getFullYear() == reminder.getFullYear() &&
                                date.getHours() == reminder.getHours() &&
                                date.getMinutes() == reminder.getMinutes()) {
                                    this.localNotification(result.rows.item(i).title, result.rows.item(i).note)
                            }
                        }
                    }
                }                
            })
            .catch(error => console.log('Error', error))
        }
    }

    localNotification = (title, note) => {
        PushNotification.localNotification({
            title : title,
            message: note,
        });
    }
}

export default new Notification();