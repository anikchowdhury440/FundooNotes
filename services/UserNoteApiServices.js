class UserNoteApiServices {
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

export default new UserNoteApiServices();