import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth'
import { startLoadingNotes } from '../store/journal'

export const useCheckAuth = () => {
  
    const { status } = useSelector((state) => state.auth)
    // const isChecking = useMemo(() => status === 'checking', [status])

    const dispatch = useDispatch()

    useEffect(() => {
     
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout())

            const {uid, displayName , email, photoURL } = user
            
            dispatch(login({uid, displayName , email, photoURL }))
            dispatch(startLoadingNotes())
            
            // También le puedo mandar de frente el 'user', porque al final lo desestructura
            // dispatch(login(user))

        })



    }, [])

    return {
        status,
        // isChecking
    }
}