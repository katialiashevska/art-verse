import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate({ children }) {
    const { isLoggedIn } = useContext(AuthContext)

    if (!isLoggedIn) {
        // If the user is not logged in, navigate to the login page
        return <Navigate to="/login" />
    } else {
        // If the user is logged in, allow to see the page
        return children
    }
}

export default IsPrivate
