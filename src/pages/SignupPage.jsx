import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import BACKEND_URL from "../utils/BACKEND_URL"
import { AuthContext } from "../context/auth.context"
import "../styles/login-signup.css"
import logo from "../assets/logo.svg"
import check from "../assets/check.svg"

function SignupPage(props) {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })
    const [globalErrorMessage, setGlobalErrorMessage] = useState("")
    const [inlineErrorMessage, setInlineErrorMessage] = useState("")

    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const onInputChange = e => {
        const { name, value } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value,
        }))
        validateInput(e)
    }

    const validateInput = e => {
        let { name, value } = e.target
        setInlineErrorMessage(prev => {
            const stateObj = { ...prev, [name]: "" }

            switch (name) {
                case "name":
                    if (!value) {
                        stateObj[name] = "Please enter your name"
                    }
                    break

                case "email":
                    if (!value) {
                        stateObj[name] = "Please enter your email"
                    }
                    break

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter a password"
                    } else if (passwordRegex.test(value)) {
                        setIsPasswordValid(true)
                    } else {
                        setIsPasswordValid(false)
                    }
                    break

                case "passwordConfirmation":
                    if (!value) {
                        stateObj[name] = "Please confirm your password"
                    }
                    break

                default:
                    break
            }

            return stateObj
        })
    }

    const handleSignupSubmit = e => {
        e.preventDefault()
        const requestBody = { ...input }
        setGlobalErrorMessage("")

        // If the POST request is successful, redirect to the login page
        axios
            .post(`${BACKEND_URL}/auth/signup`, requestBody)
            .then(response => {
                // Request to the server's endpoint `/auth/login` returns a response
                // with the JWT string ->  response.data.authToken
                console.log("JWT token", response.data.authToken)
                storeToken(response.data.authToken)
                // Verify the token by sending a request
                // to the server's JWT validation endpoint.
                authenticateUser()
                navigate("/")
            })
            .catch(error => {
                const errorDescription = error.response.data.message
                setGlobalErrorMessage(errorDescription)
            })
    }

    return (
        <div id="signup-page">
            <Link className="navbar-bg" to="/">
                <img id="logo" src={logo} alt="ArtVerse logo" />
            </Link>
            <h1 className="login-signup-title">Hello you</h1>
            {globalErrorMessage && <div className="global-error">{globalErrorMessage}</div>}
            <form className="login-signup-form" onSubmit={handleSignupSubmit}>
                <div className="label-flex">
                    <label htmlFor="name">Name</label>
                    {inlineErrorMessage.name && (
                        <span className="inline-error">{inlineErrorMessage.name}</span>
                    )}
                </div>
                <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="label-flex">
                    <label htmlFor="email">Email address</label>
                    {inlineErrorMessage.email && (
                        <span className="inline-error">{inlineErrorMessage.email}</span>
                    )}
                </div>
                <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="label-flex">
                    <label htmlFor="password">Password</label>
                    {inlineErrorMessage.password && (
                        <span className="inline-error">{inlineErrorMessage.password}</span>
                    )}
                    {isPasswordValid && <img src={check} alt="Success" className="success-icon" />}
                </div>
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="label-flex">
                    <label htmlFor="passwordConfirmation">Password confirmation</label>
                    {inlineErrorMessage.passwordConfirmation && (
                        <span className="inline-error">
                            {inlineErrorMessage.passwordConfirmation}
                        </span>
                    )}
                    {input.password && input.passwordConfirmation === input.password && (
                        <img src={check} alt="Success" className="success-icon" />
                    )}
                </div>
                <input
                    type="password"
                    name="passwordConfirmation"
                    value={input.passwordConfirmation}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="form-buttons">
                    <Link className="form-secondary-button" to="/login">
                        Already have an account?
                    </Link>
                    <button className="form-submit-button" type="submit">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignupPage
