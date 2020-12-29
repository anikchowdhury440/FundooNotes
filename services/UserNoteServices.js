import Firebase from '../config/Firebase'

class UserNoteServices {
    storeNoteinDatabase = (userid, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false
            }
            Firebase.database().ref('UserNotes/' + userid).push({
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

    updateNoteInFirebase = (userid, notekey, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false
            }
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    deleteNoteInFirebase = (userid, notekey, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : true
            }
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).set({
                notes : notes
            })
            .then(() => resolve('success'))
            .catch(error => reject(error))
        })
    }

    restoreNoteInFirebase = (userid, notekey, title, note) => {
        return new Promise((resolve, reject) => {
            const notes = {
                title : title,
                note : note,
                isDeleted : false
            }
            Firebase.database().ref('UserNotes/' + userid  + '/' + notekey).set({
                notes : notes
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
}

export default new UserNoteServices();