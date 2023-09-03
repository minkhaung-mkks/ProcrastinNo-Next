'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import useFirebase from '@/utlis/firebaseApp.jsx'
import useDatabase from '@/utlis/useDatabase.js'
import { removeFromDb, addNewToDo, stopListening, listenForValueChange } from '@/utlis/DatabaseFunctions'
import InputBox from '@/components/InputBox'

export default function Home() {

  const [agenda, setAgenda] = useState([])
  const [database, setDatabase] = useState()
  const [appIntialized, setAppIntialized] = useState(false)
  const [databaseIntialized, setDatabaseIntialized] = useState(false)
  const [input, setInput] = useState('')
  const { app: firebaseApp, isAppInitialized } = useFirebase()
  const { database: firebaseDatabase, isDatabaseInitialized } = useDatabase(firebaseApp, appIntialized);

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      addNewToDo(firebaseDatabase, input)
    }
  }

  useEffect(() => {
    console.log(firebaseApp)
    setAppIntialized(isAppInitialized)
  }, [isAppInitialized])
  useEffect(() => {
    console.log(firebaseDatabase)

    setDatabaseIntialized(isDatabaseInitialized)
  }, [isDatabaseInitialized])
  useEffect(() => {
    const onDataChange = (updatedData) => {
      setAgenda(updatedData)
    }
    console.log(firebaseDatabase)
    const listener = listenForValueChange(firebaseDatabase, 'To-Dos', onDataChange, databaseIntialized)
  }, [databaseIntialized])
  return (
    <main id="web_page">
      <div className="title_box">
        <label className="title_txt" htmlFor="Add to agenda">
          Add to list</label>
        <img src="./assets/img/main.png" className="capoo_img" alt="capoo writing something" />
        <InputBox
          input={input}
          setInput={setInput}
          placeholder={'Add a new item'}
          buttonText={'Add to list'}
          symbol={'+'}
          handleClick={() => addNewToDo(firebaseDatabase, input)}
          handleKeydown={(e) => enterKey(e)}
        />
      </div>
      <div className="sub_title_box">
        <h2 className="sub_title">Your current Agenda <img className="small_logo"
          src="./assets/favicons/android-chrome-512x512.png" alt="To do list icon" /></h2>
      </div>
      <div className="agenda_box">
        {agenda.map((data, index) => (
          <div key={index} className="agenda_card" onClick={() => removeFromDb(firebaseDatabase, data[0])}>
            <h4 className="agenda_txt">{data[1]}</h4>
          </div>
        ))}
      </div>
    </main>
  )
}
