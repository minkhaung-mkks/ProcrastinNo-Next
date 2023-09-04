'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import useFirebase from '@/utlis/firebaseApp.jsx'
import useDatabase from '@/utlis/useDatabase.js'
import { removeFromDb, addNewToDo, stopListening, listenForValueChange } from '@/utlis/DatabaseFunctions'
import InputBox from '@/components/InputBox'
import Card from '@/components/Card'
import useAuth from '@/utlis/useAuth.js'
import { handleSignInWithGoogle, upgradeAnonymousToGoogleUser, handleSignOut } from '@/utlis/Auth'

export default function Home() {

  const [agenda, setAgenda] = useState([])
  const [database, setDatabase] = useState()
  const [appIntialized, setAppIntialized] = useState(false)
  const [databaseIntialized, setDatabaseIntialized] = useState(false)
  const [input, setInput] = useState('')
  const { app: firebaseApp, isAppInitialized } = useFirebase()
  const { database: firebaseDatabase, isDatabaseInitialized } = useDatabase(firebaseApp, appIntialized);
  const { user: user, loggedIn: userLoggedIn } = useAuth(appIntialized);

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }
  const addItem = () => {
    console.log(user.uid)
    if (input.length > 0) {
      addNewToDo(firebaseDatabase, user.uid, input)
      setInput('')
    }
    else {
      alert('Item cannot be empty')
    }
  }
  useEffect(() => {
    setAppIntialized(isAppInitialized)
  }, [isAppInitialized])
  useEffect(() => {
    setDatabaseIntialized(isDatabaseInitialized)
  }, [isDatabaseInitialized])
  useEffect(() => {
    if (databaseIntialized && userLoggedIn) {
      const onDataChange = (updatedData) => {
        setAgenda(updatedData)
      }
      const listener = listenForValueChange(firebaseDatabase, `To-Dos/${user.uid}`, onDataChange, databaseIntialized)
    }
  }, [databaseIntialized, user, userLoggedIn])
  return (
    <main id="web_page">
      {user && userLoggedIn ? (
        <>
          <div className="title_box">
            <h1 className='title_txt'>Procrasti-No</h1>
            <label className="title_txt" htmlFor="Add to agenda">
              Add to list</label>

            {user.isAnonymous ? (
              <button onClick={upgradeAnonymousToGoogleUser}>
                Sign In With Google
              </button>
            ) : (
              <button onClick={handleSignOut}>
                Sign Out
              </button>)
            }

            <img src="./assets/img/main.png" className="capoo_img" alt="capoo writing something" />
            <InputBox
              input={input}
              setInput={setInput}
              placeholder={'Add a new item'}
              buttonText={'Add to list'}
              symbol={'+'}
              handleClick={addItem}
              handleKeydown={(e) => enterKey(e)}
            />
          </div>
          <div className="sub_title_box">
            <h2 className="sub_title">Your current Agenda <img className="small_logo"
              src="./assets/favicons/android-chrome-512x512.png" alt="To do list icon" /></h2>
          </div>
          <div className="agenda_box">
            {agenda && agenda.length > 0 ? agenda.map((data, index) => (
              <Card
                key={index}
                index={index}
                handleClick={() => removeFromDb(firebaseDatabase, user.uid, data[0])}
                text={data[1]}
              />
            )) : (
              <h2>No Items in list</h2>
            )}
          </div>
        </>
      ) : (
        <div className="title_box">
          <label className="title_txt" htmlFor="Add to agenda">
            Procrasti-No</label>
          <img src="./assets/img/main.png" className="capoo_img" alt="capoo writing something" />
          <h5>Loading....</h5>
        </div>
      )}
    </main>
  )
}
