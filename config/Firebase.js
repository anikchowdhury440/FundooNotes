import firebase from 'firebase'

// import {
//     API_KEY,
//     AUTH_DOMAIN,
//     DATABASE_URL,
//     PROJECT_ID,
//     STORAGE_BUCKET,
//     MESSAGE_SENDER_ID,
//     APP_ID
// } from 'react-native-dotenv'

const firebaseConfig = {
    apiKey: 'AIzaSyDpyIL5HC_Kwlo5ZRjtEABSXmOLgRGzlvc',
    authDomain: 'fundoonotes-893f7.firebaseapp.com',
    databaseURL: 'https://fundoonotes-893f7.firebaseio.com',
    projectId: 'fundoonotes-893f7',
    storageBucket: 'fundoonotes-893f7.appspot.com',
    messagingSenderId: '674009456937',
    appId: '1:674009456937:android:da7d282fc751f4e98c9738'
}

// Initilize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
