'use client'
import { useState, useEffect } from 'react'
import { getDatabase } from 'firebase/database'

const useDatabase = (firebaseApp, appIntialized) => { // Use the correct parameter name here

    const [database, setDatabase] = useState(null);
    const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);


    useEffect(() => {
        if (firebaseApp && appIntialized) {
            const databaseInstance = getDatabase(firebaseApp);
            setDatabase(databaseInstance);
            setIsDatabaseInitialized(true)
        }
    }, [firebaseApp, appIntialized]);

    return { database, isDatabaseInitialized };
}

export default useDatabase;
