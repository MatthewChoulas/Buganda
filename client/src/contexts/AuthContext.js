import React, { useContext, useState, useEffect} from 'react'
import {auth} from "../util/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true) 

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) { 
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function checkAdmin(user) {
        if (user) {
            console.log("running")
            user.getIdTokenResult()
        .then((idTokenResult) => {
            user.admin = idTokenResult.claims.admin ? true : false
            console.log(user.admin)
            setCurrentUser(user)
        })
        }
    }

    function logout() {
        signOut(auth)
    }

    //updates the current user when a new user is authorized
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        checkAdmin(user)
    })

    const value = {
        currentUser,
        signup,
        login,
        logout,
        checkAdmin
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}