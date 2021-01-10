import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'user_notes.db', createFromLocation: 1});

class SQLiteServices {
    createTableInSQliteStorage = (userId) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${userId} (note_id TEXT PRIMARY KEY, title TEXT, note TEXT, is_deleted INTEGER, label_id TEXT, is_archived INTEGER, reminder TEXT)`,
                [],
                (tx, results) => console.log('success'),
                error => console.log(error)
            )
        })
    }

    storeNoteinSQliteStorage = (userId, noteId, notes) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${userId} (note_id, title, note, is_deleted, label_id, is_archived, reminder) VALUES (?,?,?,?,?,?,?)`,
                    [noteId, notes.title, notes.note, notes.isDeleted, notes.labelId, notes.isArchived, notes.reminder],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    updateNoteinSQliteStorage = (userId, noteId, notes) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ?, is_deleted = ?, label_id = ?, is_archived = ?, reminder = ? where note_id = ?`,
                    [notes.title, notes.note, notes.isDeleted, notes.labelId, notes.isArchived, notes.reminder, noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    deleteNoteinSQliteStorage = (userId, noteId, notes) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set title = ?, note = ?, is_deleted = ?, label_id = ?, is_archived = ?, reminder = ? where note_id = ?`,
                    [notes.title, notes.note, notes.isDeleted, notes.labelId, notes.isArchived, notes.reminder, noteId],
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

    deleteTableinSQLiteStorage = (userId) => {
        db.transaction(tx => {
            tx.executeSql(
                `DROP TABLE ${userId}`,
                [],
                (tx, results) => console.log('table deleted'),
                error => console.log(error)
            );
        });
    }

    updateNoteLabelinSQliteStorage = (userId, noteId, labelId) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${userId} set label_id = ? where note_id = ?`,
                    [labelId, noteId],
                    (tx, results) => resolve('success'),
                    error => reject(error)
                );
            });
        })
    }

    selectNoteByDeletedFromSQliteStorage = (userId, isDeleted) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${userId} where is_deleted = ?`,
                    [isDeleted],
                    (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            });
        })
    }

    selectNoteByArchiveFromSQliteStorage = (userId, isArchived, isDeleted) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM ${userId} where is_deleted = ? AND is_archived = ?`,
                    [isDeleted, isArchived],
                    (tx, results) => {
                        resolve(results)
                    },
                    error => reject(error)
                );
            });
        })
    }
}

export default new SQLiteServices();