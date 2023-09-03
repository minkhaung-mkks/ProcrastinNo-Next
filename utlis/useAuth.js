import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

const useAuth = (appIntialized) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        console.log(appIntialized)

        if (appIntialized) {
            console.log(appIntialized)
            const auth = getAuth()
            onAuthStateChanged(auth, (authUser) => {
                if (authUser) {
                    // User is signed in.
                    setUser(authUser);
                    setLoggedIn(true)
                } else {
                    // User is not signed in.
                    // Sign in anonymously.
                    try {
                        signInAnonymously(auth).then((userCredential) => {
                            const user = userCredential.user
                            console.log(user)
                            setLoggedIn(true)
                            setUser(user);
                        })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode + errorMessage)
                                // ...
                            });;


                    } catch (error) {
                        console.error('Error signing in anonymously:', error);
                    }
                }
            });
        }

    }, [appIntialized]);

    return { user, loggedIn };
};

export default useAuth;
