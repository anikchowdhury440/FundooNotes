import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'user_notes.db', createFromLocation: 1});

class SQLiteServices {
    storeNoteinSQliteStorage = (userId, noteId, title, note) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${userId} (note_id, title, note, is_deleted) VALUES (?,?,?,?)`,
                    [noteId, title, note, 0],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    updateNoteinSQliteStorage = (userId, noteId, title, note) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ? where note_id = ?`,
                    [title, note, noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    deleteNoteinSQliteStorage = (userId, noteId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set is_deleted = ? where note_id = ?`,
                    [1, noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    restoreNoteinSQliteStorage = (userId, noteId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set is_deleted = ? where note_id = ?`,
                    [0, noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    removeNoteinSQliteStorage = (userId, noteId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM ${userId} where note_id = ?`,
                    [noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    selectNoteFromSQliteStorage = (userId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${userId}`,
                    [],
                    (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            });
        })
    }

    createTableInSQliteStorage = (userId) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${userId} (note_id TEXT PRIMARY KEY, title TEXT, note TEXT, is_deleted INTEGER)`,
                [],
                (tx, results) => console.log('success'),
                error => console.log(error)
            )
        })
    }

}

export default new SQLiteServices();