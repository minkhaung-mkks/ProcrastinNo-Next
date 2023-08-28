
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, remove } from 'firebase/database'
import { CreateAgendaCard } from "./utlis.js";
// import { firebaseConfig } from "./secrets.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const fetchData = async () => {
    try {
        const response = await fetch('https://procrastino.netlify.app/URL');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        console.log(data)
        return data; // This will contain the response from the edge function
    } catch (error) {
        console.error('Fetch error:', error);
    }
};
let userAgenda;

export const startApp = async () => {
    const firebaseConfig = {
        databaseURL: await fetchData()
    }
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app)
    userAgenda = ref(database, "To-Dos")
    onValue(userAgenda, (snapshot) => {
        reset()
        const data = Object.entries(snapshot.val());
        for (let i = 0; i < data.length; i++) {
            let currentData = data[i]
            const id = currentData[0]
            const text = currentData[1]
            let newCard = CreateAgendaCard(text)
            newCard.addEventListener('click', () => {
                console.log(id)
                let itemLocationInDb = ref(database, `To-Dos/${id}`)
                remove(itemLocationInDb)
            })
            agendaBox.append(newCard)
        }
    })
}


export const AddNewToDo = (inputValue) => {
    push(userAgenda, inputValue)
    console.log(`${inputValue} added to the database`)
}



const reset = () => {
    inputField.value = ''
}



console.log('started')