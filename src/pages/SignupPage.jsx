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
                        setIsPasswordValid(false)
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

        axios
            .post(`${BACKEND_URL}/auth/signup`, requestBody)
            .then(() => {
                // Log in the user immediately after successful signup
                const loginCredentials = {
                    email: input.email,
                    password: input.password,
                }

                axios
                    .post(`${BACKEND_URL}/auth/login`, loginCredentials)
                    .then(response => {
                        storeToken(response.data.authToken)
                        localStorage.setItem("firstTimeLoggedIn", "true")
                        authenticateUser()
                        navigate("/")
                    })
                    .catch(error => {
                        const errorDescription = error.response.data.message
                        setGlobalErrorMessage(errorDescription)
                    })
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
            <h1 className="signup-title">Hello you</h1>
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
