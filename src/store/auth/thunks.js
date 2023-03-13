import { loginWithEmailPassword, registerUserWithEmailPassword, signInwithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./"


// THUNKS: Async Actions that can be dispatched

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const result = await signInwithGoogle()

        if (!result.ok)  return dispatch(logout(result.errorMessage))

        // If I don't want to pass the OK property
        // delete result.ok
        
        dispatch(login(result))

        console.log({result})

        
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName})

        if ( !ok )  return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName , email, photoURL }))
        
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {

    return async (dispatch) => {

        dispatch(checkingCredentials())

        const {  ok, uid, photoURL, displayName , errorMessage } = await loginWithEmailPassword({email, password})

        if ( !ok )  return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName , email, photoURL }))

    }

}