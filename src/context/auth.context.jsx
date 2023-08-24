import React, { useState, useEffect } from "react"
import axios from "axios"
import BACKEND_URL from "../utils/BACKEND_URL"

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    /* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }
