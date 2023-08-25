import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import BACKEND_URL from "../utils/BACKEND_URL"
import { AuthContext } from "../context/auth.context"
import "../styles/login-signup.css"
import logo from "../assets/logo.svg"

function LoginPage(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleEmailInput = e => setEmail(e.target.value)
    const handlePasswordInput = e => setPassword(e.target.value)

    const handleLoginSubmit = e => {
        e.preventDefault()
        const requestBody = { email, password }

        axios
            .post(`${BACKEND_URL}/auth/login`, requestBody)
            .then(response => {
                storeToken(response.data.authToken)
                localStorage.setItem("firstTimeLoggedIn", "true")
                // Verify the token by sending a request
                // to the server's JWT validation endpoint.
                authenticateUser()
                navigate("/")
            })
            .catch(error => {
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div id="login-page">
            <Link className="navbar-bg" to="/">
                <img id="logo" src={logo} alt="ArtVerse logo" />
            </Link>
            <h1 className="login-signup-title">Welcome back</h1>
            {errorMessage && <p className="global-error">{errorMessage}</p>}
            <form className="login-signup-form" onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" value={email} onChange={handleEmailInput} />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordInput}
                />

                <div className="form-buttons">
                    <Link className="form-secondary-button" to="/signup">
                        New here? Sign up
                    </Link>
                    <button className="form-submit-button" type="submit">
                        Log in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
