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
                    databaseURL: data
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
