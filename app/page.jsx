'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, remove } from 'firebase/database'
import styles from './page.module.css'

export default function Home() {

  const [agenda, setAgenda] = useState([])
  const [database, setDatabase] = useState()
  const [input, setInput] = useState('')

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

  const startApp = async () => {
    const firebaseConfig = {
      databaseURL: 'https://to-do-b8cb3-default-rtdb.asia-southeast1.firebasedatabase.app/'
    }
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const ref_database = getDatabase(app)
    setDatabase(ref_database)
    userAgenda = ref(ref_database, "To-Dos")
    onValue(userAgenda, (snapshot) => {
      // reset()
      const data = Object.entries(snapshot.val());
      setAgenda(data)
    })
  }
  const removeFromDb = (id) => {
    console.log(id)
    let itemLocationInDb = ref(database, `To-Dos/${id}`)
    remove(itemLocationInDb)
  }
  const AddNewToDo = () => {
    let itemLocationInDb = ref(database, `To-Dos`)
    push(itemLocationInDb, input)
  }
  const enterKey = (e) => {
    if (e.key === 'Enter') {
      AddNewToDo()
    }
  }
  useEffect(() => {
    startApp()
  }, [])

  return (
    <main id="web_page">
      <div className="title_box">
        <label className="title_txt" for="Add to agenda">
          Add to list</label>
        <img src="./assets/img/main.png" className="capoo_img" alt="capoo writing something" />
        <div className="input_box">
          <input id="new_item_input" name="Add to agenda" type="text" className="input_field"
            placeholder="Add a new item" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => enterKey(e)} />
          <input onClick={AddNewToDo} className="add_btn" type="button" value="Add to list" />
          <span onClick={AddNewToDo} className="add_symbol">+</span>
        </div>
      </div>
      <div className="sub_title_box">
        <h2 className="sub_title">Your current Agenda <img className="small_logo"
          src="./assets/favicons/android-chrome-512x512.png" alt="To do list icon" /></h2>
      </div>
      <div className="agenda_box">
        {agenda.map((data) => (
          <div className="agenda_card" onClick={() => removeFromDb(data[0])}>
            <h4 className="agenda_txt">{data[1]}</h4>
          </div>
        ))}
      </div>
    </main>
  )
}
