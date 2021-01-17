import Firebase from '../config/Firebase'

class UserNoteServices {
    storeNoteinDatabase = (userid, noteKey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('success')) 
            .catch((error) => reject(error))  
        }) 
    }

    getNoteFromDatabase = (userid) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid).once('value')
                .then(snapshot => resolve(snapshot.val()))
                .catch(error => reject(error))
        })
    }

    updateNoteInFirebase = (userid, noteKey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + noteKey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    deleteNoteInFirebase = (userid, notekey, notes) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    restoreNoteInFirebase = (userid, notekey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey + '/notes').update({
                isDeleted : 0
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    removeNoteInFirebase = (userid, notekey) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).remove()
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    updateNoteLabelInFirebase = (userid, notekey, labelId) => {
        return new Promise((resolve, reject) => {
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey + '/' + 'notes').update({
                labelId : labelId
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    storeNoteinDatabaseAPI = (userid, noteKey, notes) => {
        return new Promise((resolve, reject) => {
            fetch(`https://fundoonotes-893f7-default-rtdb.firebaseio.com/UserNotes/${userid}/${noteKey}.json`,{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   notes : notes
                })
            })
            .then(() => resolve('success')) 
            .catch((error) => reject(error))  
        }) 
    }

    removeNoteinDatabaseAPI = (userid, notekey) => {
        return new Promise((resolve, reject) => {
            fetch(`https://fundoonotes-893f7-default-rtdb.firebaseio.com/UserNotes/${userid}/${notekey}.json`,{
                method: 'DELETE'
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }
}

export default new UserNoteServices();