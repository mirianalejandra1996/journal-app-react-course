import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import AuthRoutes from "../auth/routes/AuthRoutes"
import { FirebaseAuth } from "../firebase/config"
import JournalRoutes from "../journal/routes/JournalRoutes"
import { login, logout } from "../store/auth"
import { CheckingAuth } from "../ui"


export const AppRouter = () => {

    const { status } = useSelector((state) => state.auth)
    const isChecking = useMemo(() => status === 'checking', [status])

    const dispatch = useDispatch()

    useEffect(() => {
     
        onAuthStateChanged(FirebaseAuth, async (user) => {
            console.log('user', user)

            if (!user) return dispatch(logout())

            const {uid, displayName , email, photoURL } = user
            
            dispatch(login({uid, displayName , email, photoURL }))
            
            // También le puedo mandar de frente el 'user', porque al final lo desestructura
            // dispatch(login(user))

        })



    }, [])
    

    if (isChecking) return <CheckingAuth/>

    return (
        <Routes>

            {
                (status === 'authenticated')
                ? <Route path="/*" element={<JournalRoutes/>} />
                : <Route path="/auth/*" element={<AuthRoutes/>} /> 
            }

            {/* <Route path="/*" element={<Navigate to='/auth/login'/>} />  */}
            <Route path="*" element={<Navigate to='/auth/login'/>} /> 





            {/* Login and Register */}
            {/* <Route path="/auth/*" element={<AuthRoutes/>} /> */}

            {/* Journal App */}
            {/* <Route path="/*" element={<JournalRoutes/>} /> */}
        </Routes>
    )
}