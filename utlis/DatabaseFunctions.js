import { ref, push, set, onValue, remove, off } from 'firebase/database'

export const removeFromDb = (database, uid, id) => {
    let itemLocationInDb = ref(database, `To-Dos/${uid}/${id}`)
    remove(itemLocationInDb)
}
export const addNewToDo = (database, uid, input) => {
    let itemLocationInDb = ref(database, `To-Dos/${uid}`)
    push(itemLocationInDb, input)
}

export const listenForValueChange = (database, location = 'To-Dos', onDataChanged, databaseIntialized) => {
    if (database && databaseIntialized) {
        console.log(database)
        let userAgenda = ref(database, location);

        const callback = (snapshot) => {
            if (snapshot.exists()) {
                const data = Object.entries(snapshot.val());
                onDataChanged(data); // Call the provided callback with the updated data
            }
            else {
                onDataChanged(null)
            }
        };

        onValue(userAgenda, callback);
    }
}

export const stopListening = (listener) => {
    off(listener)
}