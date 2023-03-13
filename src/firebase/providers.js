import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Here we are creating a new intance of our function
const googleProvider = new GoogleAuthProvider()

export const signInwithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        // console.log({credential})

        const {displayName, email, photoURL, uid} = result.user
        // console.log({user})
        return {
            ok: true,
            // User info
            displayName,
            email,
            photoURL,
            uid,
        }

    } catch (error) {
        // Handle Errors here.
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try {

        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password)

        console.log('response', response)

        const { uid, photoURL } = response.user

        await updateProfile( FirebaseAuth.currentUser, {displayName})

        return {
            ok: true,
            uid, photoURL, email, displayName
        }


    } catch (error) {
        console.log('error', error)
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async ({email, password}) => {
     try {

        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)

        console.log('viendo el response', response)
        const { uid, photoURL, displayName } = response.user

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

     } catch (error) {
        console.log('error loginWithEmailpass', error.message)
        return { ok: false, errorMessage: error.message }
     }
}

export const logoutFirebase = async () => {
    console.log('ocococ,')
    return await signOut(FirebaseAuth)
}