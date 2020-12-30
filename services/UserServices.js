import Firebase from '../config/Firebase'

class UserServices {
    register  = (email, password) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => resolve(user))
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        reject('Email Already Exist')
                    }
                    console.log(error);
                })
        })
    }

    login = (email, password) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => resolve(user))
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        reject('Email not Found')
                    }
                    if (error.code === 'auth/wrong-password') {
                        reject('Incorrect Password')
                    }
                    console.log(error)
                })
        })
    }

    forgotPassword = (email) => {
        return new Promise((resolve, reject) => {
            Firebase.auth().sendPasswordResetEmail(email)
                .then(() => resolve('success') )
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        reject('Email not Found')
                    }
                    console.log(error);
                })
        })
    }

    signout = () => {
        return new Promise((resolve, reject) => {
            Firebase.auth().signOut()
                .then(() => resolve('success') )
                .catch(error => reject(error))
        })
    }


    writeUserDataInRealtimeDatabase = (userid, firstName, lastName, email) => {
        Firebase.database().ref('users/' + userid).set({
            firstName : firstName,
            lastName : lastName,
            email : email,
        })
    }

    readUserDataFromRealtimeDatabase = (userid) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('users/' + userid).once('value')
                .then(snapshot => resolve(snapshot.val()))
                .catch(error => reject(error))
        })
    }
}

export default new UserServices();