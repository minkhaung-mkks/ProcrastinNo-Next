import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';

function useFirebase() {
    const [app, setApp] = useState(null);
    const [isAppInitialized, setIsAppInitialized] = useState(false);

    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                const response = await fetch('/api/firebase');
                const data = await response.json();
                const firebaseConfig = {
                    apiKey: "AIzaSyDNr3yZEDDIE4zcAUqs-Fn9IXeomDAZyis",
                    authDomain: "to-do-b8cb3.firebaseapp.com",
                    databaseURL: "https://to-do-b8cb3-default-rtdb.asia-southeast1.firebasedatabase.app",
                    projectId: "to-do-b8cb3",
                    storageBucket: "to-do-b8cb3.appspot.com",
                    messagingSenderId: "782208814642",
                    appId: "1:782208814642:web:e6b4eeca4af2394b23362b",
                    measurementId: "G-466ES3W084"
                };
                const appInstance = initializeApp(firebaseConfig);
                setApp(appInstance);
                setIsAppInitialized(true); // Set the initialization status to true
            } catch (error) {
                // Handle errors, e.g., network issues or incorrect data format
                throw error;
            }
        };

        initializeFirebase();
    }, []);

    return { app, isAppInitialized };
}

export default useFirebase;
