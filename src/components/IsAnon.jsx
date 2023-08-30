import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsAnon({ children }) {
    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn) {
        // If the user is logged in, navigate to the home page
        return <Navigate to="/favourites" />
    } else {
        // If the user is not logged in, allow to see the page
        return children
    }
}

export default IsAnon
