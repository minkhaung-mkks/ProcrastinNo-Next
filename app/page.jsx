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

  const startApp = async () => {
    const response = await fetch('/api/firebase')
    const data = await response.json()
    const firebaseConfig = {
      databaseURL: data
    }
    const app = initializeApp(firebaseConfig);
    const ref_database = getDatabase(app)
    setDatabase(ref_database)
    let userAgenda = ref(ref_database, "To-Dos")
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
    setInput('')
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
        <label className="title_txt" htmlFor="Add to agenda">
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
