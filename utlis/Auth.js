import { getAuth, linkWithPopup, GoogleAuthProvider, signInWithPopup, signOut, signInWithCredential, EmailAuthProvider, linkWithCredential } from 'firebase/auth';

export const handleSignInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
        const googleUserCredential = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token);
        const email = googleUserCredential.user.email;
        // const existingUser = await findUserByEmail(auth, email);

        linkWithCredential(auth.currentUser, credential)
            .then((usercred) => {
                const user = usercred.user;
                console.log("Anonymous account successfully upgraded", user);
            }).catch((error) => {
                console.log("Error upgrading anonymous account", error);
            });


        // The user is now signed in with Google.
    } catch (error) {
        console.error('Error signing in with Google:', error);
    }
};

export const upgradeAnonymousToGoogleUser = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser.isAnonymous) {
        const provider = new GoogleAuthProvider();

        try {
            await linkWithPopup(currentUser, provider);
            // The anonymous user has been linked with Google account.
        } catch (error) {
            if (error?.code === "auth/credential-already-in-use") {
                const credential = GoogleAuthProvider.credentialFromError(error)
                const login = await signInWithCredential(auth, credential)
                    .then((user) => {
                        console.log(user);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            console.error('Error upgrading anonymous user:', error);
        }
    }
};
export const upgradeToEmailAndPassAccount = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password)
    const auth = getAuth();
    linkWithCredential(auth.currentUser, credential)
        .then((usercred) => {
            const user = usercred.user;
            console.log("Account linking success", user);
        }).catch((error) => {
            console.log("Account linking error", error);
        });
}
export const handleSignOut = async () => {
    const auth = getAuth();

    try {
        if (!auth.currentUser.isAnonymous) {
            await signOut(auth);
        }
        else {
            alert("You are already logged out")
        }
        // The user has been signed out successfully.
        // You can now redirect the user or update the UI as needed.
    } catch (error) {
        console.error('Error signing out:', error);
    }
};
